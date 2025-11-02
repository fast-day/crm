import { cn } from "@/shared/utils";

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
};

const variants = {
  light: 'text-white',
  primary: 'text-slate-600',
  gray: 'text-gray-400',
};

export type SpinnerProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
};

export const Spinner = ({
  size = 'md',
  variant = 'primary',
  className = '',
}: SpinnerProps) => {
  return (
    <>
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn('animate-spin flex items-center', sizes[size], variants[variant], className)}
      >
        <path d="M16 4V8" stroke="#030002" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 16H24" stroke="#030002" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.4875 24.4875L21.6625 21.6625" stroke="#030002" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 28V24" stroke="#030002" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.51245 24.4875L10.3375 21.6625" stroke="#030002" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 16H8" stroke="#030002" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.51245 7.51251L10.3375 10.3375" stroke="#030002" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">Loading</span>
    </>
  );
};