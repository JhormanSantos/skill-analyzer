import type { AnalysisData } from "../../types";

interface SummaryProps {
  summary: AnalysisData['analysisSummary'];
}

const AnalysisSummary = ({ summary }: SummaryProps) => {
  // <dl> is a Description List, semantically correct for key-value data.
  return (
    <dl className="bg-slate-100 p-4 rounded-lg flex flex-col text-center gap-y-4 md:flex-row md:justify-around md:gap-y-0">
      <div className="flex flex-col-reverse">
        {/* <dt> is the term, <dd> is the description/data */}
        <dt className="text-sm text-slate-600">Role Analyzed</dt>
        <dd className="text-2xl font-bold text-indigo-600">{summary.role}</dd>
      </div>
      <div className="flex flex-col-reverse">
        <dt className="text-sm text-slate-600">Profiles Found</dt>
        <dd className="text-2xl font-bold text-indigo-600">{summary.profilesAnalyzed}</dd>
      </div>
      <div className="flex flex-col-reverse">
        <dt className="text-sm text-slate-600">Skills Searched</dt>
        <dd className="text-2xl font-bold text-indigo-600">{summary.searchSkills.length}</dd>
      </div>
    </dl>
  );
};

export default AnalysisSummary;