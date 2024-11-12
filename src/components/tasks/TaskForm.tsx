'use client';

import { useState } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';

import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types/task';

interface TaskFormProps {
  onCloseAction: () => void;
  task?: Task;
}

export default function TaskForm({ onCloseAction, task }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || ('medium' as Task['priority']),
    tags: task?.tags || ([] as string[]),
    tagInput: '',
  });

  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      updateTask(task.id, {
        ...task,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        tags: formData.tags,
        updatedAt: new Date(),
      });
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        status: 'todo',
        priority: formData.priority,
        tags: formData.tags,
        timeTracking: {
          starts: [],
          pauses: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
      };
      addTask(newTask);
    }
    onCloseAction();
  };

  const handleTagAdd = () => {
    if (
      formData.tagInput.trim() &&
      !formData.tags.includes(formData.tagInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: '',
      }));
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center">
      <div className="tw-bg-white tw-rounded-2xl tw-p-6 tw-w-full tw-max-w-md tw-relative">
        <button
          onClick={onCloseAction}
          className="tw-absolute tw-right-4 tw-top-4 tw-text-[#744436] hover:tw-text-[#B17C55]"
        >
          <XMarkIcon className="tw-w-6 tw-h-6" />
        </button>

        <h2 className="tw-text-2xl tw-font-bold tw-text-[#744436] tw-mb-6 tw-flex tw-items-center">
          <span className="tw-mr-2">🎵</span>
          {task ? 'Edit Task' : 'New Task'}
        </h2>

        <form onSubmit={handleSubmit} className="tw-space-y-4">
          <div>
            <label
              htmlFor="title"
              className="tw-block tw-text-sm tw-font-medium tw-text-[#744436] tw-mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="tw-w-full tw-px-3 tw-py-2 tw-border-2 tw-border-[#E6B89C] tw-rounded-lg focus:tw-border-[#B17C55] focus:tw-outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="tw-block tw-text-sm tw-font-medium tw-text-[#744436] tw-mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="tw-w-full tw-px-3 tw-py-2 tw-border-2 tw-border-[#E6B89C] tw-rounded-lg focus:tw-border-[#B17C55] focus:tw-outline-none tw-h-24"
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="tw-block tw-text-sm tw-font-medium tw-text-[#744436] tw-mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  priority: e.target.value as Task['priority'],
                }))
              }
              className="tw-w-full tw-px-3 tw-py-2 tw-border-2 tw-border-[#E6B89C] tw-rounded-lg focus:tw-border-[#B17C55] focus:tw-outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="tagInput"
              className="tw-block tw-text-sm tw-font-medium tw-text-[#744436] tw-mb-1"
            >
              Tags
            </label>
            <div className="tw-flex tw-gap-2 tw-mb-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="tw-px-2 tw-py-1 tw-bg-[#E6B89C] tw-text-[#744436] tw-rounded-full tw-text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="tw-flex tw-gap-2">
              <input
                id="tagInput"
                type="text"
                value={formData.tagInput}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, tagInput: e.target.value }))
                }
                className="tw-flex-1 tw-px-3 tw-py-2 tw-border-2 tw-border-[#E6B89C] tw-rounded-lg focus:tw-border-[#B17C55] focus:tw-outline-none"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="tw-px-4 tw-py-2 tw-bg-[#E6B89C] tw-text-[#744436] tw-rounded-lg hover:tw-bg-[#D4A285]"
              >
                Add
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="tw-w-full tw-px-4 tw-py-2 tw-bg-[#B17C55] tw-text-white tw-rounded-lg hover:tw-bg-[#744436] tw-transition-colors"
          >
            {task ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
