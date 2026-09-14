'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const generatorTypes = [
 { code: 'HB', name: 'Home Banner', slug: 'home-banner' },
 { code: 'GM', name: 'Game', slug: 'game' },
 { code: 'PS', name: 'Packet S', slug: 'packet-s' },
 { code: 'PL', name: 'Packet L', slug: 'packet-l' },
];

export default function WebsiteReference() {
 const [value,setValue]=useState('');
 const [reference,setReference]=useState('');
 const [message,setMessage]=useState('');
 const [logoName,setLogoName]=useState('');
 useEffect(()=>{
  const saved=sessionStorage.getItem('sitelens-reference')||'';
  setLogoName(sessionStorage.getItem('sitelens-logo-name')||'');
  if(saved){setValue(saved);setReference(saved);}
 },[]);
 function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  try {
   const raw=value.trim();
   if(!raw)throw new Error();
   const url=new URL(/^[a-z][a-z\d+.-]*:/i.test(raw)?raw:`https://${raw}`);
   if(!['https:','http:'].includes(url.protocol)||!url.hostname.includes('.')||url.username||url.password)throw new Error();
   setReference(url.href);setValue(url.href);setMessage('');sessionStorage.setItem('sitelens-reference',url.href);
  }catch{setMessage('请输入有效的网站网址，例如 https://example.com。');}
 }
 return <section className="website-reference" aria-labelledby="reference-title">
  <div className="reference-heading"><div><div className="eyebrow">01 / TARGET URL</div><h2 id="reference-title">输入目标网址</h2></div></div>
  <form onSubmit={submit}><div className="reference-input-row" style={{marginTop:28}}><input id="reference-url" aria-label="网址" type="text" inputMode="url" autoComplete="url" spellCheck={false} maxLength={2048} value={value} onChange={e=>{setValue(e.target.value);setReference('');setMessage('');}} placeholder="粘贴网址，例如 https://www.example.com" aria-describedby={message?'reference-status':undefined}/><button type="submit">分析网址 <span aria-hidden="true">↗</span></button></div></form>
  {reference&&<div className="reference-saved"><div><small>已添加的参考网站</small><a href={reference} target="_blank" rel="noopener noreferrer">{reference}</a></div><button type="button" onClick={()=>{setReference('');setValue('');setMessage('已移除参考网址。');sessionStorage.removeItem('sitelens-reference');}}>移除</button></div>}
  {message&&<p id="reference-status" className="reference-status" role="status">{message}</p>}
  {reference&&<div className="logo-upload"><div><small>LOGO</small><strong>{logoName||'添加 Logo'}</strong></div><label><input type="file" accept="image/*" onChange={e=>{const name=e.target.files?.[0]?.name||'';setLogoName(name);if(name)sessionStorage.setItem('sitelens-logo-name',name);}}/><span>{logoName?'更换':'选择文件'}</span></label>{logoName&&<button type="button" onClick={()=>{setLogoName('');sessionStorage.removeItem('sitelens-logo-name');}}>移除</button>}</div>}
  {reference&&<section className="generator-panel" aria-labelledby="generator-title">
   <div className="generator-heading"><span>02 / ASSET TYPE</span><h3 id="generator-title">选择内容</h3></div>
   <div className="generator-grid">{generatorTypes.map(item=><Link key={item.code} href={`/workspace/${item.slug}?source=${encodeURIComponent(reference)}`}><span>{item.code}</span><strong>{item.name}</strong><b aria-hidden="true">↗</b></Link>)}</div>
  </section>}
 </section>;
}
