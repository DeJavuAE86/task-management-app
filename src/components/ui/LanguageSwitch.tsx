'use client';

import { GlobeAltIcon } from '@heroicons/react/24/outline';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="tw-flex tw-items-center tw-bg-[#E6B89C] tw-rounded-full tw-px-3 tw-py-2 tw-shadow-md hover:tw-bg-[#D4A285] tw-transition-colors">
      <GlobeAltIcon className="tw-w-5 tw-h-5 tw-text-[#744436] tw-mr-2" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'zh-CN' | 'en-US')}
        className="tw-bg-transparent tw-text-[#744436] tw-appearance-none tw-pr-6 tw-pl-1 focus:tw-outline-none hover:tw-cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23744436'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.25rem center',
          backgroundSize: '1.2em 1.2em',
        }}
      >
        <option value="zh-CN">{t.common.language.chinese}</option>
        <option value="en-US">{t.common.language.english}</option>
      </select>
    </div>
  );
}
