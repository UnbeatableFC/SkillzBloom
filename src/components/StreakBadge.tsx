import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  count: number;
}

export default function StreakBadge({ count }: StreakBadgeProps) {
  return (
    <div className="card-elevated p-6 flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center">
        <Flame className="w-7 h-7 text-accent-foreground" />
      </div>
      <div>
        <div className="text-3xl font-heading font-bold text-foreground">{count}</div>
        <div className="text-sm text-muted-foreground">Day Streak</div>
      </div>
    </div>
  );
}
