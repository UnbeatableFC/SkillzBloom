import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Target, TrendingUp, BookOpen, Sparkles, Check } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Daily Tasks',
      description: 'Break your learning into achievable daily goals and track completion.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visualize your skill growth and maintain learning streaks.',
    },
    {
      icon: BookOpen,
      title: 'Reflections',
      description: 'Journal your learning journey and capture insights.',
    },
    {
      icon: Sparkles,
      title: 'AI Suggestions',
      description: 'Get personalized tips to optimize your learning strategy.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Your Personal Skill Growth Companion
          </div>
          
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Grow Your Skills,
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">One Day at a Time</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Track your learning journey, complete daily tasks, reflect on your progress, 
            and get AI-powered suggestions to reach your goals faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-primary text-white btn-glow text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8"
              onClick={() => navigate('/dashboard')}
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto card-elevated p-8 md:p-12">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4 text-center">
            Learning alone can feel overwhelming
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Without structure, it's easy to lose motivation, forget what you've learned, 
            or feel stuck on where to focus next.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {['No clear direction', 'Lost motivation', 'Inconsistent practice'].map((problem, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                </div>
                <span>{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              A simple system that works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              SkillzBloom gives you the structure and motivation you need to grow consistently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card-elevated p-6 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto card-elevated gradient-primary p-12 md:p-16 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-white">
            Ready to start growing?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join students around the world who are building their skills one day at a time.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-8"
            onClick={() => navigate('/auth')}
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SkillzBloom. Built for learners, by learners.</p>
        </div>
      </footer>
    </div>
  );
}
