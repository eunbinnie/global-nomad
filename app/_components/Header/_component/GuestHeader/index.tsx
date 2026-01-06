import { LogIn, MapPin } from 'lucide-react';
import Link from 'next/link';

const NAV_INFO = [
  {
    href: '/main',
    label: '체험',
    icon: <MapPin className="size-[14px] mobile:size-4" />,
  },
  {
    href: '/login',
    label: '로그인',
    icon: <LogIn className="size-[14px] mobile:size-4" />,
  },
];

export default function GuestHeader() {
  return (
    <div className="flex items-center gap-2 mobile:gap-3">
      {NAV_INFO.map((item) => (
        <Link href={item.href} key={item.label} className="flex items-center gap-1">
          {item.icon}
          <span className="text-sm mobile:text-md">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
