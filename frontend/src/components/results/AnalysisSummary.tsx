import type { AnalysisData } from "../../types";

interface SummaryProps {
  summary: AnalysisData['analysisSummary'];
}

const AnalysisSummary = ({ summary }: SummaryProps) => {
  const torreGreen = '#9ACD32'; // Using the lighter green for visibility

  return (
    <dl className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex flex-col text-center gap-y-4 md:flex-row md:justify-around md:gap-y-0">
      <div className="flex flex-col-reverse">
        <dt className="text-sm text-slate-400">Role Analyzed</dt>
        <dd className={`text-2xl font-bold text-[${torreGreen}]`}>{summary.role}</dd>
      </div>
      <div className="flex flex-col-reverse">
        <dt className="text-sm text-slate-400">Profiles Found</dt>
        <dd className={`text-2xl font-bold text-[${torreGreen}]`}>{summary.profilesAnalyzed}</dd>
      </div>
      <div className="flex flex-col-reverse">
        <dt className="text-sm text-slate-400">Skills Searched</dt>
        <dd className={`text-2xl font-bold text-[${torreGreen}]`}>{summary.searchSkills.length}</dd>
      </div>
    </dl>
  );
};

export default AnalysisSummary;