import type { Metadata } from 'next';
import './globals.css';
import './generator.css';
import './workspace.css';
import PageTransition from './page-transition';
export const metadata: Metadata = { title: 'SiteLens — 网站视觉分析', description: '从网址开始整理网站颜色、风格、Mascot 与 Banner 尺寸。' };
export default function Layout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body><PageTransition>{children}</PageTransition></body></html>}
