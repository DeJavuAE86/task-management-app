'use client';

import { useEffect, useState } from 'react';

import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';

import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types/task';

interface TimeTrackerProps {
  task: Task;
}

export default function TimeTracker({ task }: TimeTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const updateTask = useTaskStore((state) => state.updateTask);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTracking = () => {
    const now = new Date();
    if (isTracking) {
      updateTask(task.id, {
        ...task,
        timeTracking: {
          ...task.timeTracking,
          pauses: [...task.timeTracking.pauses, now],
        },
      });
    } else {
      updateTask(task.id, {
        ...task,
        timeTracking: {
          ...task.timeTracking,
          starts: [...task.timeTracking.starts, now],
        },
      });
    }
    setIsTracking(!isTracking);
  };

  return (
    <div className="tw-flex tw-items-center tw-space-x-2">
      <button
        onClick={toggleTracking}
        className="tw-p-1 tw-rounded-full hover:tw-bg-[#E6B89C] tw-transition-colors"
      >
        {isTracking ? (
          <PauseIcon className="tw-w-4 tw-h-4 tw-text-[#B17C55]" />
        ) : (
          <PlayIcon className="tw-w-4 tw-h-4 tw-text-[#B17C55]" />
        )}
      </button>
      <span className="tw-text-xs tw-font-mono tw-text-[#744436]">
        {formatTime(elapsedTime)}
      </span>
    </div>
  );
}
