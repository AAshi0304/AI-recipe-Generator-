
import React from 'react';

interface IconProps {
  children: React.ReactNode;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ children, className }) => {
  return (
    <div className={`w-6 h-6 ${className}`}>
      {children}
    </div>
  );
};

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
  </Icon>
);

export const BookmarkIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className, isFilled }) => (
  <Icon className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill={isFilled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>
  </Icon>
);

export const HeartIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className, isFilled }) => (
  <Icon className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill={isFilled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  </Icon>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  </Icon>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  </Icon>
);

export const UserGroupIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.226A4.5 4.5 0 0 1 12 13.5a4.5 4.5 0 0 1 1.54 3.24m-3.078 2.14A9.09 9.09 0 0 1 12.002 18c-2.33 0-4.406-.9-5.962-2.376a3 3 0 0 1-1.34-2.72m1.944-2.226A4.5 4.5 0 0 0 12 13.5a4.5 4.5 0 0 0-1.54 3.24m6.078 2.14a9.086 9.086 0 0 1-2.28 1.48 3 3 0 0 1-4.682-2.72m-1.944-2.226a4.5 4.5 0 0 1 1.54-3.24m-3.078-2.14A9.09 9.09 0 0 1 5.962 12c0-2.33.9-4.406 2.376-5.962a3 3 0 0 1 2.72-1.34m2.226 1.944A4.5 4.5 0 0 1 12 10.5a4.5 4.5 0 0 1-3.24-1.54m2.14 3.078a9.09 9.09 0 0 1-1.48 2.28 3 3 0 0 1 2.72 4.682m2.226-1.944A4.5 4.5 0 0 0 12 10.5a4.5 4.5 0 0 0 3.24-1.54m-2.14 3.078a9.086 9.086 0 0 0 1.48 2.28 3 3 0 0 0 2.72 4.682" />
    </svg>
  </Icon>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>
  </Icon>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  </Icon>
);
