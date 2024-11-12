'use client';

import { useState } from 'react';

import {
  AdjustmentsHorizontalIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

import { useLanguage } from '@/contexts/LanguageContext';
import { Task } from '@/types/task';

interface TaskFiltersProps {
  onFilterChangeAction: (filters: {
    status: Task['status'] | '';
    priority: Task['priority'] | '';
    search: string;
  }) => void;
  onSortChangeAction: (sort: {
    field: keyof Task;
    direction: 'asc' | 'desc';
  }) => void;
}

export default function TaskFilters({
  onFilterChangeAction,
  onSortChangeAction,
}: TaskFiltersProps) {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
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

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChangeAction(newFilters);
  };

  const handleSortChange = (field: keyof Task) => {
    const newSort = {
      field,
      direction:
        sort.field === field && sort.direction === 'desc' ? 'asc' : 'desc',
    } as const;
    setSort(newSort);
    onSortChangeAction(newSort);
  };

  return (
    <div className="tw-mb-6">
      <div className="tw-flex tw-items-center tw-space-x-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-bg-[#E6B89C] tw-text-[#744436] tw-rounded-full hover:tw-bg-[#D4A285] tw-transition-colors"
        >
          <FunnelIcon className="tw-w-5 tw-h-5 tw-mr-2" />
          {t.task.filter.title}
        </button>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <AdjustmentsHorizontalIcon className="tw-w-5 tw-h-5 tw-text-[#744436]" />
          <select
            value={sort.field}
            onChange={(e) => handleSortChange(e.target.value as keyof Task)}
            className="tw-bg-[#E6B89C] tw-text-[#744436] tw-rounded-full tw-px-3 tw-py-2"
          >
            <option value="createdAt">{t.task.sort.createdAt}</option>
            <option value="priority">{t.task.sort.priority}</option>
            <option value="title">{t.task.sort.title}</option>
          </select>
          <button
            onClick={() => handleSortChange(sort.field)}
            className="tw-p-2 tw-rounded-full hover:tw-bg-[#E6B89C] tw-transition-colors"
          >
            {sort.direction === 'desc' ? (
              <ArrowDownIcon className="tw-w-5 tw-h-5 tw-text-[#744436]" />
            ) : (
              <ArrowUpIcon className="tw-w-5 tw-h-5 tw-text-[#744436]" />
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="tw-mt-4 tw-p-4 tw-bg-white tw-rounded-xl tw-border-2 tw-border-[#E6B89C] tw-space-y-4">
          <div>
            <input
              type="text"
              placeholder={t.task.filter.searchPlaceholder}
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="tw-w-full tw-px-4 tw-py-2 tw-border-2 tw-border-[#E6B89C] tw-rounded-lg focus:tw-border-[#B17C55] focus:tw-outline-none"
            />
          </div>
          <div className="tw-flex tw-space-x-4">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="tw-flex-1 tw-px-4 tw-py-2 tw-border-2 tw-border-[#E6B89C] tw-rounded-lg focus:tw-border-[#B17C55] focus:tw-outline-none"
            >
              <option value="">{t.task.filter.allStatus}</option>
              <option value="todo">{t.task.status.todo}</option>
              <option value="in-progress">
                {t.task.status['in-progress']}
              </option>
              <option value="completed">{t.task.status.completed}</option>
            </select>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="tw-flex-1 tw-px-4 tw-py-2 tw-border-2 tw-border-[#E6B89C] tw-rounded-lg focus:tw-border-[#B17C55] focus:tw-outline-none"
            >
              <option value="">{t.task.filter.allPriority}</option>
              <option value="low">{t.task.priority.low}</option>
              <option value="medium">{t.task.priority.medium}</option>
              <option value="high">{t.task.priority.high}</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
