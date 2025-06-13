import express, { Request, Response } from 'express'; // <--- CAMBIO 1: Importar los tipos
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// The main endpoint that the frontend will call
app.post('/api/analyze', async (req: Request, res: Response) => { 
  const { role, skills } = req.body;

  // validation
  if (!role || !skills || !Array.isArray(skills)) {
    res.status(400).json({ message: 'Missing role or skills in request body' });
    return;
  }

  try {
    // const to search for profiles using the _searchStream API
    const searchPayload = {
      query: role,
      identityType: 'person',
      limit: 30, // Let's analyze the first 30 profiles to keep it fast
    };

    const searchResponse = await fetch('https://torre.ai/api/entities/_searchStream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(searchPayload),
    });

    if (!searchResponse.ok || !searchResponse.body) {
      throw new Error('Failed to fetch from Torre search stream API');
    }
    
    // The response is a stream, so we need to process it chunk by chunk
    const reader = searchResponse.body.getReader();
    const decoder = new TextDecoder();
    let streamContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      streamContent += decoder.decode(value, { stream: true });
    }
    
    // Each line in the stream is a separate JSON object. We parse them all.
    const profilesFromSearch = streamContent
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));
    
    // Fetch the detailed "genome" for each profile in parallel
    const genomePromises = profilesFromSearch.map(profile => 
      fetch(`https://torre.ai/api/genome/bios/${profile.username}`)
        .then(response => response.ok ? response.json() : null)
    );
    
    // Promise.allSettled waits for all promises, even if some fail
    const genomeResults = await Promise.allSettled(genomePromises);
    
    const validGenomes = genomeResults
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => (result as PromiseFulfilledResult<any>).value);

    // Analyze the skills
    const skillAnalysis: Record<string, number> = {};
    skills.forEach(skill => {
      const count = validGenomes.filter(genome => 
        genome.strengths.some((s: any) => s.name.toLowerCase() === skill.toLowerCase())
      ).length;
      
      // Calculate the percentage based on the number of valid genomes we could fetch
      skillAnalysis[skill] = validGenomes.length > 0
      ? (count / validGenomes.length) * 100
      : 0;
    });

    const skillGap = skills.map(skill => ({
      skill,
      percentage: Math.round(skillAnalysis[skill] || 0),
    }));

    // Format the final response object
    const finalResponse = {
      analysisSummary: {
        role,
        profilesAnalyzed: validGenomes.length,
        searchSkills: skills,
      },
      skillGap,
      profiles: profilesFromSearch.map(p => ({ // Return simplified profile data
        username: p.username,
        name: p.name,
        picture: p.pictureThumbnail || p.picture, 
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