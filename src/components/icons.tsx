
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
    <div className="w-[100px] h-[60px] flex items-center justify-center rounded-lg bg-black p-2">
        <svg viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-full">
            <path d="M52.35,46.19H2.65A2.65,2.65,0,0,1,0,43.54V2.65A2.65,2.65,0,0,1,2.65,0H43.54A2.65,2.65,0,0,1,46.19,2.65V7.47h6.16A2.65,2.65,0,0,1,55,10.12V43.54A2.65,2.65,0,0,1,52.35,46.19ZM5.3,38.24H48.7V10.12H43.54A2.65,2.65,0,0,1,40.89,7.47V5.3H5.3Z" fill="#FF7900"/>
            <path d="M27.5,23.18a7,7,0,0,0-7,7v.88a7,7,0,0,0,7,7h0a7,7,0,0,0,7-7v-.88a7,7,0,0,0-7-7Zm0,11.3a4.34,4.34,0,1,1,4.34-4.34A4.34,4.34,0,0,1,27.5,34.48Z" fill="#FF7900"/>
        </svg>
    </div>
);


export const WaveLogo = () => (
  <OperatorLogo className="bg-gradient-to-br from-blue-500 to-cyan-400">
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-auto h-full p-1">
        <path d="M40,78.2c-12.2,0-22.1-9.9-22.1-22.1c0-5.7,2.2-11,5.8-15c-3.3-3.9-5.3-8.8-5.3-14.2C18.4,14.7,28.3,4.8,40,4.8 s21.6,9.9,21.6,22.1c0,5.4-2,10.3-5.3,14.2c3.6,4,5.8,9.3,5.8,15C62.1,68.3,52.2,78.2,40,78.2z" fill="#000020"/>
        <path d="M26.2,26.9c0,7.6-6.2,13.8-13.8,13.8S-1.4,34.5-1.4,26.9c0-5.8,3.6-10.8,8.6-12.8c-0.1,0-0.2-0.1-0.2-0.1 c-0.8-0.2-1.3-0.9-1.3-1.8c0-1,0.8-1.9,1.9-1.9c0.7,0,1.4,0.4,1.7,1l0,0c0.1,0.1,0.1,0.2,0.2,0.3c5.3-2,11.5-0.1,14,5.2 C25.8,21.7,26.2,24.3,26.2,26.9z" fill="#000020" transform="matrix(0.866, -0.5, 0.5, 0.866, 13.43, 23.45)"/>
        <ellipse cx="40" cy="58" rx="15" ry="19" fill="#FFFFFF"/>
        <circle cx="34" cy="22" r="3" fill="#FFFFFF"/>
        <circle cx="46" cy="22" r="3" fill="#FFFFFF"/>
        <path d="M36.3,31.4c2.1,2.8,5.4,2.8,7.5,0c0.5-0.7,0.5-1.6,0-2.2c-0.7-0.5-1.6-0.5-2.2,0c-0.9,1.2-2.3,1.2-3.2,0 c-0.5-0.7-1.5-0.7-2.2,0C35.8,29.8,35.8,30.7,36.3,31.4z" fill="#FF8C00"/>
        <path d="M28.8,77.2c-3.1,3.1-8.2,3.1-11.3,0l0,0c-3.1-3.1-3.1-8.2,0-11.3c1.5-1.5,3.5-2.4,5.7-2.4s4.1,0.8,5.7,2.4 C31.9,69,31.9,74.1,28.8,77.2z" fill="#FF8C00"/>
        <path d="M62.5,77.2c-3.1,3.1-8.2,3.1-11.3,0l0,0c-3.1-3.1-3.1-8.2,0-11.3c1.5-1.5,3.5-2.4,5.7-2.4c2.1,0,4.1,0.8,5.7,2.4 C65.6,69,65.6,74.1,62.5,77.2z" fill="#FF8C00"/>
      </svg>
  </OperatorLogo>
);

export const MtnLogo = () => (
    <div className="w-[100px] h-[60px] flex items-center justify-center rounded-lg bg-[#ffcc00] p-1">
        <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" className="w-auto h-full">
            <path d="M99.5,10.5v40a10,10,0,0,1-10,10H10.5a10,10,0,0,1-10-10V10.5a10,10,0,0,1,10-10h80a10,10,0,0,1,9,5Z" fill="#ffcc00"/>
            <path d="M99.5,10.5v40a10,10,0,0,1-10,10H10.5a10,10,0,0,1-10-10V10.5a10,10,0,0,1,10-10h80a10,10,0,0,1,9,5Z" stroke="#fff" strokeWidth="1" fill="none"/>
            <g fill="#00447c">
                <text x="10" y="25" fontFamily="sans-serif" fontSize="20" fontWeight="bold">MTN</text>
                <text x="10" y="45" fontFamily="sans-serif" fontSize="10" fontWeight="bold">Mobile Money</text>
            </g>
        </svg>
    </div>
);
