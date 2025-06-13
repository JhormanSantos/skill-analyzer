import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Este es nuestro "Contrato" de API CORREGIDO
const fakeApiData = {
  analysisSummary: {
    "role": "Software Engineer",
    "profilesAnalyzed": 42,
    "searchSkills": ["React", "Node.js", "TypeScript"]
  },
  skillGap: [
    { "skill": "React", "percentage": 85 },
    { "skill": "Node.js", "percentage": 60 },
    { "skill": "TypeScript", "percentage": 45 }
  ],
  profiles: [
    {
      "username": "johndoe",
      "name": "John Doe",
      "picture": "https://randomuser.me/api/portraits/men/75.jpg",
      "professionalHeadline": "Senior Software Engineer at Tech Corp"
    },
    {
      "username": "janedoe",
      "name": "Jane Doe",
      "picture": "https://randomuser.me/api/portraits/women/75.jpg",
      "professionalHeadline": "Frontend Developer | React Specialist"
    }
  ]
};

app.post('/api/analyze', (req, res) => {
  console.log("Request received on /api/analyze");
  res.json(fakeApiData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});