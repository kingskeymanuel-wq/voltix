import { cn } from "@/lib/utils";

export const LightningIcon = () => (
  <div className="p-2 group/logo">
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="group-hover/logo:animate-rotate-y"
    >
      <defs>
        <filter id="icon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="flash-gradient">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="1" fill="url(#flash-gradient)" className="group-hover/logo:animate-flash-boom" />
      <path 
        d="M20 3C30.4934 3 39 10.2969 39 19C39 27.7031 30.4934 35 20 35C9.50659 35 1 27.7031 1 19C1 10.2969 9.50659 3 20 3Z" 
        stroke="hsl(var(--foreground))" 
        strokeWidth="3"
      />
      <path 
        d="M20 7C28.2843 7 35 12.2843 35 19C35 25.7157 28.2843 31 20 31C11.7157 31 5 25.7157 5 19C5 12.2843 11.7157 7 20 7Z" 
        fill="hsl(var(--foreground))"
        style={{filter: 'url(#icon-glow)'}}
      />
      <path 
        d="M20 11C25.5228 11 30 15.0228 30 19C30 22.9772 25.5228 27 20 27C14.4772 27 10 22.9772 10 19C10 15.0228 14.4772 11 20 11Z"
        fill="hsl(var(--background))"
      />
    </svg>
  </div>
);

const OperatorLogo = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn(
    "w-[100px] h-[60px] rounded-lg flex items-center justify-center text-sm font-black text-white shadow-md",
    className
  )}>
    {children}
  </div>
);

export const OrangeLogo = () => (
    <div className="w-[100px] h-[60px] flex items-center justify-center rounded-lg bg-black p-1">
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-auto h-full">
            <path d="M30,5A25,25,0,1,0,55,30,25,25,0,0,0,30,5ZM42.5,42.5H17.5a2.5,2.5,0,0,1,0-5h25a2.5,2.5,0,0,1,0,5Zm0-10H17.5a2.5,2.5,0,0,1,0-5h25a2.5,2.5,0,0,1,0,5Zm0-10H17.5a2.5,2.5,0,0,1,0-5h25a2.5,2.5,0,0,1,0,5Z" fill="#ff7900"/>
        </svg>
    </div>
);


export const WaveLogo = () => (
  <OperatorLogo className="bg-gradient-to-br from-blue-600 to-blue-800">
    WAVE
  </OperatorLogo>
);

export const MtnLogo = () => (
    <div className="w-[100px] h-[60px] flex items-center justify-center rounded-lg bg-[#ffcc00] p-1">
        <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" className="w-auto h-full">
            <path d="M99.5,10.5v40a10,10,0,0,1-10,10H10.5a10,10,0,0,1-10-10V10.5a10,10,0,0,1,10-10h80a10,10,0,0,1,9,5Z" fill="#ffcc00"/>
            <path d="M99.5,10.5v40a10,10,0,0,1-10,10H10.5a10,10,0,0,1-10-10V10.5a10,10,0,0,1,10-10h80a10,10,0,0,1,9,5Z" stroke="#fff" stroke-width="1" fill="none"/>
            <g fill="#00447c">
                <text x="10" y="25" font-family="sans-serif" font-size="20" font-weight="bold">MTN</text>
                <text x="10" y="45" font-family="sans-serif" font-size="10" font-weight="bold">Mobile Money</text>
            </g>
        </svg>
    </div>
);
