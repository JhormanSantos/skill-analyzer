import { useMutation } from '@tanstack/react-query';
import { analyzeSkills } from './services/api';
import type { AnalysisData } from './types';

import SearchForm from './components/SearchForm';
import ResultsDashboard from './components/ResultsDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const mutation = useMutation<AnalysisData, Error, { role: string; skills: string[] }>({
    mutationFn: ({ role, skills }) => analyzeSkills(role, skills),
  });

  return (
    // The base styles are for mobile
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <header className="text-center py-8 px-4">
        {/* Font size adjusts for medium screens (md) and up */}
        <h1 className="text-3xl md:text-5xl font-bold">Skill Gap Analyzer</h1>
        <p className="text-base md:text-lg text-slate-600 mt-2">Analyze the talent gap for any job role.</p>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 pb-12">
        <SearchForm
          onAnalyze={(role, skills) => mutation.mutate({ role, skills })}
          isLoading={mutation.isPending}
        />

        <div className="mt-8 md:mt-12">
          {mutation.isPending && <LoadingSpinner />}
          {mutation.isError && <ErrorMessage message={mutation.error.message} />}
          {mutation.data && <ResultsDashboard data={mutation.data} />}
        </div>
      </main>
    </div>
  );
}

export default App;