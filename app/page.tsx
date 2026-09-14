import WebsiteReference from './website-reference';
import Link from 'next/link';

export default function WebsiteAnalysis() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="site-name" href="/" aria-label="SiteLens 首页">Site<span>Lens</span></Link>
      </header>
      <main className="analysis-main">
        <WebsiteReference />
      </main>
    </div>
  );
}
