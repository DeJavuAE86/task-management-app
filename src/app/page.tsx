import Link from 'next/link';

export default function Home() {
  return (
    <main className="tw-flex tw-min-h-screen tw-flex-col tw-items-center tw-justify-center tw-p-24 tw-bg-[#FDF6E3]">
      <h1 className="tw-text-4xl tw-font-bold tw-mb-8 tw-text-[#744436] tw-flex tw-items-center">
        <span className="tw-mr-3">🎸</span>
        轻音少女任务管理
        <span className="tw-ml-3">🍵</span>
      </h1>
      <div className="tw-space-y-4 tw-text-center">
        <p className="tw-text-[#B17C55] tw-mb-6">
          来一起喝茶吃点心，顺便管理一下任务吧！
        </p>
        <Link
          href="/tasks"
          className="tw-px-6 tw-py-3 tw-bg-[#B17C55] tw-text-[#FDF6E3] tw-rounded-full hover:tw-bg-[#744436] tw-transition-colors tw-shadow-md tw-inline-flex tw-items-center"
        >
          <span className="tw-mr-2">🎵</span>
          开始管理任务
        </Link>
      </div>
    </main>
  );
}
