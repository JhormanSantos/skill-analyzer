import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req: Request, res: Response) => {
  const { role, skills } = req.body;

  if (!role || !skills || !Array.isArray(skills)) {
    res.status(400).json({ message: 'Missing role or skills in request body' });
    return;
  }

  try {
    const searchPayload = {
      query: role,
      identityType: 'person',
      limit: 20,
    };

    const searchResponse = await fetch('https://torre.ai/api/entities/_searchStream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(searchPayload),
    });

    if (!searchResponse.ok || !searchResponse.body) {
      throw new Error('Failed to fetch from Torre search stream API');
    }
    
    const reader = searchResponse.body.getReader();
    const decoder = new TextDecoder();
    let streamContent = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      streamContent += decoder.decode(value, { stream: true });
    }
    
    // Parse the results and add a simple safety filter for objects that have a username
    const profilesFromSearch = streamContent
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line))
      .filter(p => p.username); // Ensure we only process profiles with a username

    const genomePromises = profilesFromSearch.map(profile => 
      fetch(`https://torre.ai/api/genome/bios/${profile.username}`)
        .then(response => response.ok ? response.json() : null)
    );
    
    const genomeResults = await Promise.allSettled(genomePromises);
    
    const validGenomes = genomeResults
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => (result as PromiseFulfilledResult<any>).value);

    // ... (El análisis de skills no cambia)
    const skillAnalysis: Record<string, number> = {};
    skills.forEach(skill => {
      const count = validGenomes.filter(genome => 
        genome.strengths.some((s: any) => s.name.toLowerCase() === skill.toLowerCase())
      ).length;
      skillAnalysis[skill] = validGenomes.length > 0 ? (count / validGenomes.length) * 100 : 0;
    });
    const skillGap = skills.map(skill => ({
      skill,
      percentage: Math.round(skillAnalysis[skill] || 0),
    }));

    const finalResponse = {
      analysisSummary: {
        role,
        profilesAnalyzed: validGenomes.length,
        searchSkills: skills,
      },
      skillGap,
      profiles: profilesFromSearch.map(p => ({
        username: p.username,
        name: p.name,
        picture: p.imageUrl, // Using the correct key: imageUrl
        professionalHeadline: p.professionalHeadline,
      })),
    };

    res.json(finalResponse);

  } catch (error: any) {
    console.error('Error during analysis:', error);
    res.status(500).json({ message: 'An internal server error occurred', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});