export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  timeTracking: {
    starts: Date[];
    pauses: Date[];
    completed?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
