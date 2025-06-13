import type { AnalysisData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const analyzeSkills = async (role: string, skills: string[]): Promise<AnalysisData> => {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, skills }),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
};