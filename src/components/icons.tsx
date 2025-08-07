import { cn } from "@/lib/utils";

export const LightningIcon = () => (
  <div className="relative inline-flex items-center justify-center bg-gradient-to-br from-primary to-blue-600 p-3 rounded-2xl shadow-[0_0_30px_rgba(0,212,255,0.6)] overflow-hidden">
    <span className="text-2xl font-black text-primary-foreground">⚡</span>
    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
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
  <OperatorLogo className="bg-gradient-to-br from-orange-500 to-orange-700">
    ORANGE
  </OperatorLogo>
);

export const WaveLogo = () => (
  <OperatorLogo className="bg-gradient-to-br from-blue-600 to-blue-800">
    WAVE
  </OperatorLogo>
);

export const MtnLogo = () => (
  <OperatorLogo className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black">
    MTN
  </OperatorLogo>
);
