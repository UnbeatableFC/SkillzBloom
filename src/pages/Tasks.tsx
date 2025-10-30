import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTasks } from '@/hooks/useTasks';
import { useSkills } from '@/hooks/useSkills';
import { CheckCircle2, Circle, Plus, Trash2, ListTodo } from 'lucide-react';
import { toast } from 'sonner';

export default function Tasks() {
  const { tasks, addTask, deleteTask, toggleTaskStatus } = useTasks();
  const { skills } = useSkills();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'todo' | 'done'>('all');
  const [newTask, setNewTask] = useState({
    title: '',
    skill: '',
    dueDate: new Date().toISOString().split('T')[0],
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }
    if (!newTask.skill) {
      toast.error('Please select a skill');
      return;
    }

    addTask({
      title: newTask.title,
      skill: newTask.skill,
      dueDate: new Date(newTask.dueDate).toISOString(),
      status: 'todo',
    });

    setNewTask({
      title: '',
      skill: '',
      dueDate: new Date().toISOString().split('T')[0],
    });
    setIsAddDialogOpen(false);
    toast.success('Task added successfully');
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus;
  });

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.skill]) {
      acc[task.skill] = [];
    }
    acc[task.skill].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Tasks</h1>
            <p className="text-muted-foreground">Manage your learning goals and track progress</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white btn-glow gap-2">
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">Add New Task</DialogTitle>
                <DialogDescription>Create a new learning task to track your progress</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Practice React hooks for 30 minutes"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skill">Skill Category</Label>
                  <Select value={newTask.skill} onValueChange={(value) => setNewTask({ ...newTask, skill: value })}>
                    <SelectTrigger id="skill">
                      <SelectValue placeholder="Select a skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {skills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.name}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gradient-primary text-white btn-glow">
                  Add Task
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
            <TabsTrigger value="todo">To Do ({tasks.filter(t => t.status === 'todo').length})</TabsTrigger>
            <TabsTrigger value="done">Done ({tasks.filter(t => t.status === 'done').length})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <EmptyState
            icon={ListTodo}
            title="No tasks yet"
            description="Create your first task to start tracking your learning progress"
            actionLabel="Add Task"
            onAction={() => setIsAddDialogOpen(true)}
          />
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTasks).map(([skill, skillTasks]) => (
              <div key={skill} className="card-elevated p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">{skill}</h3>
                <div className="space-y-3">
                  {skillTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                    >
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className="flex-shrink-0"
                      >
                        {task.status === 'done' ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                        onClick={() => {
                          deleteTask(task.id);
                          toast.success('Task deleted');
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
