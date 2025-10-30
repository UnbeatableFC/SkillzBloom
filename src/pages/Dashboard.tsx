import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StreakBadge from '@/components/StreakBadge';
import ProgressRing from '@/components/ProgressRing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTasks } from '@/hooks/useTasks';
import { useSkills } from '@/hooks/useSkills';
import { useStreak } from '@/hooks/useStreak';
import { getMockAiTips } from '@/lib/mockData';
import { AiTip } from '@/types';
import { Sparkles, CheckCircle2, Circle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { tasks, toggleTaskStatus } = useTasks();
  const { skills } = useSkills();
  const { streak } = useStreak();
  const navigate = useNavigate();
  const [aiTips, setAiTips] = useState<AiTip[]>(getMockAiTips());

  const todayTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate).toDateString();
    const today = new Date().toDateString();
    return dueDate === today;
  });

  const completedToday = todayTasks.filter(t => t.status === 'done').length;
  const totalToday = todayTasks.length;
  const progressPercentage = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;

  const refreshTips = () => {
    setAiTips(getMockAiTips());
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Here's your learning overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <StreakBadge count={streak.count} />
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <ProgressRing progress={progressPercentage} label="Today's Progress" />
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-heading font-bold mb-1">{skills.length}</div>
              <div className="text-sm text-muted-foreground">Active Skills</div>
              <Button 
                variant="link" 
                className="mt-2 text-primary"
                onClick={() => navigate('/dashboard/skills')}
              >
                View all →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks */}
        <Card className="card-elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-heading">Today's Tasks</CardTitle>
                <CardDescription>
                  {completedToday} of {totalToday} completed
                </CardDescription>
              </div>
              <Button onClick={() => navigate('/dashboard/tasks')}>
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {todayTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Circle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No tasks for today</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => navigate('/dashboard/tasks')}
                >
                  Add your first task
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {todayTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    {task.status === 'done' ? (
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{task.skill}</p>
                    </div>
                  </div>
                ))}
                {todayTasks.length > 3 && (
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => navigate('/dashboard/tasks')}
                  >
                    View {todayTasks.length - 3} more tasks
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="card-elevated gradient-primary text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <CardTitle className="font-heading text-white">AI Suggestions</CardTitle>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={refreshTips}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
            <CardDescription className="text-white/80">
              Personalized tips to help you grow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiTips.map((tip) => (
                <div key={tip.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-heading font-semibold mb-1 text-white">{tip.title}</h4>
                  <p className="text-sm text-white/90">{tip.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
