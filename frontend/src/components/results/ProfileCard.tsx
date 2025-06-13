// In frontend/src/components/results/ProfileCard.tsx
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
      <article className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-200">
        
        {profile.picture ? (
          // If a picture exists, show it
          <img 
            src={profile.picture} 
            alt={`Profile picture of ${profile.name}`}
            className="w-14 h-14 rounded-full object-cover shrink-0" 
            // Add an onError handler as an extra fallback
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          // If no picture, show a generic SVG avatar
          <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        <div>
          <h4 className="font-bold text-slate-800">{profile.name}</h4>
          <p className="text-sm text-slate-500">{profile.professionalHeadline}</p>
        </div>
      </article>
    </a>
  )
};

export default ProfileCard;