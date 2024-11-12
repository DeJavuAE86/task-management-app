'use client';

import {
  ClockIcon,
  PencilIcon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types/task';

import TimeTracker from './TimeTracker';

interface TaskCardProps {
  task: Task;
  view: 'list' | 'board';
  onEditAction: (task: Task) => void;
}

export default function TaskCard({ task, view, onEditAction }: TaskCardProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const priorityColors = {
    low: 'tw-bg-[#E6B89C] tw-text-[#744436]',
    medium: 'tw-bg-[#D4A285] tw-text-[#744436]',
    high: 'tw-bg-[#B17C55] tw-text-[#FDF6E3]',
  };

  const statusEmoji = {
    todo: '🎸',
    'in-progress': '🍵',
    completed: '🍰',
  };

  return (
    <div
      className={`
      tw-bg-white tw-rounded-xl tw-shadow-sm tw-border-2 tw-border-[#E6B89C]
      ${view === 'list' ? 'tw-p-4' : 'tw-p-3'}
      hover:tw-shadow-md tw-transition-all hover:tw-scale-[1.02]
      hover:tw-border-[#B17C55]
    `}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task.id);
      }}
    >
      <div className="tw-flex tw-justify-between tw-items-start">
        <h3 className="tw-font-bold tw-text-[#744436] tw-flex tw-items-center">
          {statusEmoji[task.status as keyof typeof statusEmoji]}
          <span className="tw-ml-2">{task.title}</span>
        </h3>
        <span
          className={`
          tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium
          ${priorityColors[task.priority as keyof typeof priorityColors]}
        `}
        >
          {task.priority}
        </span>
      </div>

      <p className="tw-mt-2 tw-text-[#744436] tw-text-sm">{task.description}</p>

      <div className="tw-mt-3 tw-flex tw-flex-wrap tw-gap-2">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="tw-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-full tw-bg-[#FDF6E3] tw-text-[#B17C55] tw-text-xs"
          >
            <TagIcon className="tw-w-3 tw-h-3 tw-mr-1" />
            {tag}
          </span>
        ))}
      </div>

      <div className="tw-mt-3 tw-pt-3 tw-border-t tw-border-[#E6B89C] tw-flex tw-justify-between tw-items-center">
        <div className="tw-flex tw-items-center tw-space-x-4">
          <TimeTracker task={task} />
          <div className="tw-flex tw-items-center tw-text-xs tw-text-[#B17C55]">
            <ClockIcon className="tw-w-4 tw-h-4 tw-mr-1" />
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="tw-flex tw-gap-2">
          <button
            onClick={() => onEditAction(task)}
            className="tw-p-1 tw-rounded-full hover:tw-bg-[#E6B89C] tw-transition-colors"
          >
            <PencilIcon className="tw-w-4 tw-h-4 tw-text-[#B17C55]" />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="tw-p-1 tw-rounded-full hover:tw-bg-[#E6B89C] tw-transition-colors"
          >
            <TrashIcon className="tw-w-4 tw-h-4 tw-text-[#B17C55]" />
          </button>
        </div>
      </div>
    </div>
  );
}
