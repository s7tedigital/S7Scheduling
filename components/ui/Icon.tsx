import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode;
}

const Icon: React.FC<IconProps> = ({ children, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7"height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </Icon>
);

export const ProjectsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </Icon>
);

export const ScenesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M8 12.5 12 7l4 5.5" />
    <path d="M3 14.5h18" />
  </Icon>
);

export const CastCrewIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

export const ScheduleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </Icon>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </Icon>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><polyline points="9 18 15 12 9 6" /></Icon>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><polyline points="15 18 9 12 15 6" /></Icon>
);

export const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
    </Icon>
);

export const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
    </Icon>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </Icon>
);