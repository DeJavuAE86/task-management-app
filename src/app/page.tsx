import Link from 'next/link';

export default function Home() {
  return (
    <main className="tw-flex tw-min-h-screen tw-flex-col tw-items-center tw-justify-center tw-p-24">
      <h1 className="tw-text-4xl tw-font-bold tw-mb-8">Task Management App</h1>
      <div className="tw-space-x-4">
        <Link
          href="/auth/login"
          className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded hover:tw-bg-blue-600"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="tw-px-4 tw-py-2 tw-bg-green-500 tw-text-white tw-rounded hover:tw-bg-green-600"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
