import type { AnalysisData } from "../../types";

type Profile = AnalysisData['profiles'][0];

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <article className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
      <img 
        src={profile.picture} 
        alt={`Profile picture of ${profile.name}`} 
        className="w-14 h-14 rounded-full object-cover shrink-0" 
      />
      <div>
        <h4 className="font-bold text-slate-800">{profile.name}</h4>
        <p className="text-sm text-slate-500">{profile.professionalHeadline}</p>
      </div>
    </article>
  )
};

export default ProfileCard;