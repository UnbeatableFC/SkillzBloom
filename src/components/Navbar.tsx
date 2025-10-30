import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  
  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">SkillzBloom</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/auth')}>
            Log in
          </Button>
          <Button className="gradient-primary text-white btn-glow" onClick={() => navigate('/auth')}>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
