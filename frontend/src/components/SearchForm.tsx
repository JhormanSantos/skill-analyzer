import React, { useState } from 'react';

interface SearchFormProps {
  onAnalyze: (role: string, skills: string[]) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onAnalyze, isLoading }) => {
  const [role, setRole] = useState('Software Engineer');
  const [skills, setSkills] = useState<string[]>(['React', 'Node.js']);
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

  const torreGreen = '#9ACD32';
  const torreGreenDark = '#8CBF26';

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 p-6 sm:p-8 rounded-xl shadow-lg space-y-6">
      <div className="space-y-2">
        <label htmlFor="role-input" className="text-sm font-medium text-slate-300">Job Role</label>
        <input
          id="role-input"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., Product Manager"
          required
          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="skill-input" className="text-sm font-medium text-slate-300">Skills to Analyze</label>
        <div className="flex gap-2">
          <input
            id="skill-input"
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter"
            // Input styles for dark mode
            className="flex-grow px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
          />
          <button type="button" onClick={handleAddSkill} className={`px-4 py-2 bg-gray-700 text-lime-300 font-semibold rounded-lg hover:bg-gray-600 border border-gray-600`}>Add</button>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map(skill => (
            // Skill tag styles for dark mode
            <div key={skill} className={`flex items-center gap-2 bg-gray-700 text-lime-300 text-sm font-medium px-3 py-1 rounded-full`}>
              <span>{skill}</span>
              <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-gray-400 hover:text-white font-bold">×</button>
            </div>
          ))}
        </div>
      </div>

      <button 
        type="submit" 
        className={`w-full px-4 py-3 text-gray-900 font-bold rounded-lg shadow-md transition-colors bg-[${torreGreen}] hover:bg-[${torreGreenDark}] disabled:bg-slate-500 disabled:text-slate-100 disabled:cursor-not-allowed`} 
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Gap'}
      </button>
    </form>
  );
};

export default SearchForm;