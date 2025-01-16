import Link from 'next/link';
import NavLinks from '@/components/ui/nav-links';

export default function SideNav() {
  return (
    <div className="flex h-screen flex-col px-7 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-blue-600 p-8 text-3xl font-bold text-white md:h-20"
        href="/dashboard">WARD
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-screen w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}