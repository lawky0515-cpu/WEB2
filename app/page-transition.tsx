'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
 const router = useRouter();
 const pathname = usePathname();
 const [leaving, setLeaving] = useState(false);
 const timeout = useRef<number | null>(null);

 useEffect(() => {
  setLeaving(false);
  return () => { if (timeout.current) window.clearTimeout(timeout.current); };
 }, [pathname]);

 function navigate(event: React.MouseEvent<HTMLDivElement>) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = event.target as Element;
  const link = target.closest('a');
  if (!link || link.target || link.hasAttribute('download')) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || /^https?:\/\//i.test(href)) return;
  event.preventDefault();
  if (leaving) return;
  setLeaving(true);
  timeout.current = window.setTimeout(() => router.push(href), 180);
 }

 return <div className={leaving ? 'page-transition page-transition-leaving' : 'page-transition'} onClickCapture={navigate}>{children}</div>;
}
