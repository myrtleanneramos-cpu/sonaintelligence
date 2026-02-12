interface ChibiSunProps {
  mood?: 'happy' | 'thinking' | 'worried';
  className?: string;
}

export function ChibiSun({ mood = 'happy', className = '' }: ChibiSunProps) {
  return (
    <div className={`relative ${className}`}>
      
    </div>
  );
}
