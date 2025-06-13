import React, { useState } from 'react';

interface SearchFormProps {
  onAnalyze: (role: string, skills: string[]) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onAnalyze, isLoading }) => {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(role, skills);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-6">
      <div className="space-y-2">
        <label htmlFor="role-input" className="text-sm font-medium text-slate-700">Job Role</label>
        <input
          id="role-input"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., Product Manager"
          required
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="skill-input" className="text-sm font-medium text-slate-700">Skills to Analyze</label>
        <div className="flex gap-2">
          <input
            id="skill-input"
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter"
            className="flex-grow px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button type="button" onClick={handleAddSkill} className="px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200">Add</button>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map(skill => (
            <div key={skill} className="flex items-center gap-2 bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">
              <span>{skill}</span>
              <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-slate-500 hover:text-slate-800 font-bold">×</button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors" disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze Gap'}
      </button>
    </form>
  );
};

export default SearchForm;