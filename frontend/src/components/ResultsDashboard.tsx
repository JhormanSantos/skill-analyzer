import type { AnalysisData } from '../types';
import AnalysisSummary from './results/AnalysisSummary';
import ProfileCard from './results/ProfileCard';
import SkillChart from './results/SkillChart';

const ResultsDashboard = ({ data }: { data: AnalysisData }) => {
  // Check if no profiles were found in the analysis
  if (data.analysisSummary.profilesAnalyzed === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
        <p className="text-slate-600">Try adjusting your search role for better results.</p>
      </div>
    );
  }
  
  // If we have results, render the full dashboard
  return (
    <section className="space-y-8 md:space-y-12" aria-labelledby="results-heading">
      <AnalysisSummary summary={data.analysisSummary} />
      
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <SkillChart skillData={data.skillGap} />
      </div>

      <div>
        <h3 id="results-heading" className="text-xl font-bold mb-4">Analyzed Profiles</h3>
        <div className="space-y-3">
          {data.profiles.map(profile => (
            <ProfileCard key={profile.username} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsDashboard;