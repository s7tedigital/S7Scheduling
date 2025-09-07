import React from 'react';
import { CastMember } from '../../types';
import Card from '../ui/Card';
import { useAppContext } from '../../context/AppContext';
import { EditIcon } from '../ui/Icon';

interface CastMemberCardProps {
  member: CastMember;
  onEdit: (member: CastMember) => void;
}

const CastMemberCard: React.FC<CastMemberCardProps> = ({ member, onEdit }) => {
  const { setSelectedItem } = useAppContext();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(member);
  };

  return (
    <Card onClick={() => setSelectedItem(member)} className="text-center p-6 flex flex-col items-center relative group">
       <button 
        onClick={handleEditClick} 
        className="absolute top-2 right-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Edit ${member.name}`}
      >
        <EditIcon className="w-4 h-4" />
      </button>
      <img
        src={member.photoUrl}
        alt={member.name}
        className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-slate-200 dark:border-slate-700"
      />
      <h3 className="text-lg font-bold text-slate-800 dark:text-white">{member.name}</h3>
      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{member.role}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{member.department}</p>
      <a
        href={`mailto:${member.contact}`}
        onClick={(e) => e.stopPropagation()}
        className="text-sm text-slate-600 dark:text-slate-300 hover:underline"
        aria-label={`Email ${member.name}`}
      >
        {member.contact}
      </a>
    </Card>
  );
};

export default CastMemberCard;