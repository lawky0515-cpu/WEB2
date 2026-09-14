import WebsiteReference from './website-reference';

export default function WebsiteAnalysis() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="site-name" href="./" aria-label="SiteLens 首页">Site<span>Lens</span></a>
      </header>
      <main className="analysis-main">
        <WebsiteReference />
      </main>
    </div>
  );
}
