import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  view: 'list' | 'board';
}

export default function TaskCard({ task, view: _view }: TaskCardProps) {
  return (
    <div className="tw-p-4 tw-border tw-rounded-lg tw-shadow">
      <h3 className="tw-font-bold">{task.title}</h3>
      <p className="tw-text-gray-600">{task.description}</p>
      <div className="tw-flex tw-gap-2 tw-mt-2">
        <span className="tw-px-2 tw-py-1 tw-text-sm tw-bg-blue-100 tw-rounded">
          {task.status}
        </span>
        <span className="tw-px-2 tw-py-1 tw-text-sm tw-bg-yellow-100 tw-rounded">
          {task.priority}
        </span>
      </div>
    </div>
  );
}
