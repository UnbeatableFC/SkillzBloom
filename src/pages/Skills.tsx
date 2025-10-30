import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useSkills } from '@/hooks/useSkills';
import { TrendingUp, Plus, Trash2, Target } from 'lucide-react';
import { toast } from 'sonner';

export default function Skills() {
  const { skills, addSkill, updateSkill, deleteSkill } = useSkills();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 1,
    targetLevel: 3,
  });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) {
      toast.error('Please enter a skill name');
      return;
    }

    addSkill(newSkill);
    setNewSkill({ name: '', level: 1, targetLevel: 3 });
    setIsAddDialogOpen(false);
    toast.success('Skill added successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Skills</h1>
            <p className="text-muted-foreground">Track your skill levels and set growth targets</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white btn-glow gap-2">
                <Plus className="w-4 h-4" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">Add New Skill</DialogTitle>
                <DialogDescription>Define a skill you want to track and improve</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSkill} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Skill Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., React, TypeScript, Design"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label>Current Level: {newSkill.level}</Label>
                  <Slider
                    value={[newSkill.level]}
                    onValueChange={([value]) => setNewSkill({ ...newSkill, level: value })}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Target Level: {newSkill.targetLevel}</Label>
                  <Slider
                    value={[newSkill.targetLevel]}
                    onValueChange={([value]) => setNewSkill({ ...newSkill, targetLevel: value })}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
                <Button type="submit" className="w-full gradient-primary text-white btn-glow">
                  Add Skill
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Skills List */}
        {skills.length === 0 ? (
          <EmptyState
            icon={Target}
            title="No skills yet"
            description="Add skills you want to track and set improvement goals"
            actionLabel="Add Skill"
            onAction={() => setIsAddDialogOpen(true)}
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => {
              const progress = (skill.level / skill.targetLevel) * 100;
              return (
                <Card key={skill.id} className="card-elevated group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-lg mb-1">{skill.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Level {skill.level} → {skill.targetLevel}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                        onClick={() => {
                          deleteSkill(skill.id);
                          toast.success('Skill deleted');
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-primary transition-all duration-500"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Level Dots */}
                    <div className="flex items-center gap-2 mt-4">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => updateSkill(skill.id, { level })}
                          className={`
                            w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center text-xs font-bold
                            ${level <= skill.level 
                              ? 'border-primary bg-primary text-primary-foreground' 
                              : 'border-border hover:border-primary/50'
                            }
                            ${level === skill.targetLevel ? 'ring-2 ring-accent ring-offset-2' : ''}
                          `}
                        >
                          {level}
                        </button>
                      ))}
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
