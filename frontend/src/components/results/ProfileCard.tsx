import type { AnalysisData } from "../../types";

type Profile = AnalysisData['profiles'][0];

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <a 
      href={`https://torre.ai/${profile.username}`} 
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <article className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg border border-gray-700 hover:shadow-lg hover:border-[#9ACD32] transition-all duration-200">
        
        {profile.picture ? (
          <img 
            src={profile.picture} 
            alt={`Profile picture of ${profile.name}`}
            className="w-14 h-14 rounded-full object-cover shrink-0" 
            onError={(e) => { 
              // More robust error handling: replace with fallback SVG
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = "w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center shrink-0";
                fallback.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>`;
                parent.replaceChild(fallback, (e.target as HTMLImageElement));
              }
            }}
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        <div>
          <h4 className="font-bold text-white">{profile.name}</h4>
          <p className="text-sm text-slate-400">{profile.professionalHeadline}</p>
        </div>
      </article>
    </a>
  )
};

export default ProfileCard;