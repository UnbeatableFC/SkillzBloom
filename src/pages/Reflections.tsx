import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { useReflections } from '@/hooks/useReflections';
import { BookOpen, Plus, Trash2, Smile, Meh, Frown } from 'lucide-react';
import { toast } from 'sonner';

const moodOptions = [
  { value: 'great', label: 'Great', icon: '😄', color: 'text-success' },
  { value: 'good', label: 'Good', icon: '🙂', color: 'text-primary' },
  { value: 'okay', label: 'Okay', icon: '😐', color: 'text-warning' },
  { value: 'tough', label: 'Tough', icon: '😕', color: 'text-warning' },
  { value: 'hard', label: 'Hard', icon: '😟', color: 'text-destructive' },
] as const;

export default function Reflections() {
  const { reflections, addReflection, deleteReflection } = useReflections();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newReflection, setNewReflection] = useState({
    text: '',
    mood: 'good' as typeof moodOptions[number]['value'],
  });

  const handleAddReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReflection.text.trim()) {
      toast.error('Please write your reflection');
      return;
    }

    addReflection({
      text: newReflection.text,
      mood: newReflection.mood,
      date: new Date().toISOString(),
    });

    setNewReflection({ text: '', mood: 'good' });
    setIsAddDialogOpen(false);
    toast.success('Reflection saved');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Reflections</h1>
            <p className="text-muted-foreground">Journal your learning journey and insights</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white btn-glow gap-2">
                <Plus className="w-4 h-4" />
                Add Reflection
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading">New Reflection</DialogTitle>
                <DialogDescription>Capture your thoughts and learning insights</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddReflection} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">What did you learn today?</Label>
                  <Textarea
                    id="text"
                    placeholder="Write about what you learned, what clicked, what was challenging..."
                    value={newReflection.text}
                    onChange={(e) => setNewReflection({ ...newReflection, text: e.target.value })}
                    rows={6}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>How are you feeling?</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.value}
                        type="button"
                        onClick={() => setNewReflection({ ...newReflection, mood: mood.value })}
                        className={`
                          p-4 rounded-xl border-2 transition-all text-center
                          ${newReflection.mood === mood.value 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                          }
                        `}
                      >
                        <div className="text-3xl mb-1">{mood.icon}</div>
                        <div className="text-xs font-medium">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full gradient-primary text-white btn-glow">
                  Save Reflection
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reflections List */}
        {reflections.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No reflections yet"
            description="Start journaling your learning journey and capture your insights"
            actionLabel="Add Reflection"
            onAction={() => setIsAddDialogOpen(true)}
          />
        ) : (
          <div className="space-y-4">
            {reflections.map((reflection) => {
              const mood = moodOptions.find(m => m.value === reflection.mood);
              return (
                <Card key={reflection.id} className="card-elevated group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl flex-shrink-0">{mood?.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-muted-foreground">
                            {new Date(reflection.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <span className={`text-sm font-medium ${mood?.color}`}>
                            • {mood?.label}
                          </span>
                        </div>
                        <p className="text-foreground whitespace-pre-wrap">{reflection.text}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive flex-shrink-0"
                        onClick={() => {
                          deleteReflection(reflection.id);
                          toast.success('Reflection deleted');
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
