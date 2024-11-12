'use client';

import { useState } from 'react';

import {
  ListBulletIcon,
  PlusCircleIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline';

import TaskCard from '@/components/tasks/TaskCard';
import TaskFilters from '@/components/tasks/TaskFilters';
import TaskForm from '@/components/tasks/TaskForm';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types/task';

export default function TasksPage() {
  const [view, setView] = useState<'list' | 'board'>('list');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const tasks = useTaskStore((state) => state.tasks);
  const [filters, setFilters] = useState<{
    status: Task['status'] | '';
    priority: Task['priority'] | '';
    search: string;
  }>({
    status: '',
    priority: '',
    search: '',
  });
  const [sort, setSort] = useState<{
    field: keyof Task;
    direction: 'asc' | 'desc';
  }>({
    field: 'createdAt',
    direction: 'desc',
  });
  const updateTask = useTaskStore((state) => state.updateTask);
  const { t } = useLanguage();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(undefined);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask(taskId, {
        ...task,
        status,
        updatedAt: new Date(),
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !task.description.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aValue = a[sort.field];
    const bValue = b[sort.field];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sort.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return sort.direction === 'asc'
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    return 0;
  });

  return (
    <div className="tw-min-h-screen tw-bg-[#FDF6E3]">
      {/* 顶部导航栏 */}
      <nav className="tw-bg-[#B17C55] tw-shadow-lg">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-3">
          <div className="tw-flex tw-items-center tw-justify-between">
            {/* 左侧标题 */}
            <h1 className="tw-text-2xl tw-font-bold tw-text-[#FDF6E3] tw-flex tw-items-center">
              <span className="tw-mr-2">🎸</span>
              {t.common.appName}
              <span className="tw-ml-2">🍵</span>
            </h1>

            {/* 右侧按钮组和语言切换 */}
            <div className="tw-flex tw-items-center">
              {/* 视图切换和新建任务按钮组 */}
              <div className="tw-flex tw-items-center tw-space-x-4 tw-mr-8">
                <button
                  onClick={() => setView(view === 'list' ? 'board' : 'list')}
                  className="tw-p-2 tw-rounded-full tw-bg-[#E6B89C] hover:tw-bg-[#D4A285] tw-transition-colors"
                >
                  {view === 'list' ? (
                    <ViewColumnsIcon className="tw-w-6 tw-h-6 tw-text-[#744436]" />
                  ) : (
                    <ListBulletIcon className="tw-w-6 tw-h-6 tw-text-[#744436]" />
                  )}
                </button>
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-bg-[#E6B89C] tw-text-[#744436] tw-rounded-full hover:tw-bg-[#D4A285] tw-transition-colors tw-shadow-md"
                >
                  <PlusCircleIcon className="tw-w-5 tw-h-5 tw-mr-2" />
                  {t.task.new}
                </button>
              </div>

              {/* 语言切换按钮 */}
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-8">
        <TaskFilters
          onFilterChangeAction={setFilters}
          onSortChangeAction={setSort}
        />

        {view === 'list' ? (
          <div className="tw-space-y-4">
            {sortedTasks.length === 0 ? (
              <div className="tw-text-center tw-py-12">
                <div className="tw-text-6xl tw-mb-4">🎸</div>
                <p className="tw-text-lg tw-text-[#744436]">
                  {t.task.emptyText}
                </p>
              </div>
            ) : (
              sortedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  view="list"
                  onEditAction={handleEditTask}
                />
              ))
            )}
          </div>
        ) : (
          <div className="tw-grid tw-grid-cols-3 tw-gap-6">
            {['todo', 'in-progress', 'completed'].map((status) => (
              <div
                key={status}
                className="tw-bg-white tw-rounded-2xl tw-p-4 tw-shadow-md tw-border-2 tw-border-[#E6B89C]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status as Task['status'])}
              >
                <h2 className="tw-text-lg tw-font-semibold tw-mb-4 tw-text-[#744436] tw-flex tw-items-center">
                  {status === 'todo' && '🎸 '}
                  {status === 'in-progress' && '🍵 '}
                  {status === 'completed' && '🍰 '}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </h2>
                <div className="tw-space-y-4">
                  {sortedTasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        view="board"
                        onEditAction={handleEditTask}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showTaskForm && (
        <TaskForm onCloseAction={handleCloseForm} task={editingTask} />
      )}
    </div>
  );
}
