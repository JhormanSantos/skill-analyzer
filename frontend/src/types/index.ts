export type AnalysisData = {
  analysisSummary: {
    role: string;
    profilesAnalyzed: number;
    searchSkills: string[];
  };
  skillGap: { skill: string; percentage: number }[];
  profiles: {
    username: string;
    name: string;
    picture: string;
    professionalHeadline: string;
  }[];
};
