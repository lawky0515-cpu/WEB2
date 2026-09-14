'use client';
import { useEffect, useState } from 'react';

export default function AssetForm({type,name,defaultSize}:{type:string;name:string;defaultSize:string}){
 const [source,setSource]=useState('');
 const [content,setContent]=useState('');
 const [sizeMode,setSizeMode]=useState<'auto'|'custom'>('auto');
 const [customWidth,setCustomWidth]=useState('');
 const [customHeight,setCustomHeight]=useState('');
 const [includeMascot,setIncludeMascot]=useState(false);
 const [includeLogo,setIncludeLogo]=useState(false);
 const [downloadError,setDownloadError]=useState('');
 const [preview,setPreview]=useState<{url:string;fileName:string;width:number;height:number}|null>(null);

 useEffect(()=>{setSource(new URLSearchParams(window.location.search).get('source')||'');},[]);

 function createPreview(){
  const match=defaultSize.match(/(\d+)\D+(\d+)/);
  if(sizeMode==='auto'&&!match){setDownloadError('尚未取得自动尺寸，请选择自定义。');return;}
  const width=sizeMode==='auto'?Number(match?.[1]):Number(customWidth);
  const height=sizeMode==='auto'?Number(match?.[2]):Number(customHeight);
  if(sizeMode==='custom'&&(!customWidth||!customHeight)){setDownloadError('请填写宽度和高度。');return;}
  if(width<1||height<1||width>8192||height>8192){setDownloadError('尺寸必须介于 1 至 8192 px。');return;}
  setDownloadError('');
  const canvas=document.createElement('canvas');
  canvas.width=width;canvas.height=height;
  const context=canvas.getContext('2d');
  if(!context)return;
  context.fillStyle='#070b10';context.fillRect(0,0,width,height);
  context.strokeStyle='rgba(57,230,255,.12)';context.lineWidth=1;
  const grid=Math.max(24,Math.round(Math.min(width,height)/8));
  for(let x=0;x<=width;x+=grid){context.beginPath();context.moveTo(x,0);context.lineTo(x,height);context.stroke();}
  for(let y=0;y<=height;y+=grid){context.beginPath();context.moveTo(0,y);context.lineTo(width,y);context.stroke();}
  context.fillStyle='#39e6ff';context.fillRect(0,0,Math.max(5,width*.012),height);
  const fontSize=Math.max(20,Math.min(64,Math.round(width*.055)));
  context.font=`700 ${fontSize}px Inter, Arial, sans-serif`;context.textAlign='center';context.textBaseline='middle';context.fillStyle='#edf7fa';
  const text=content.trim()||name;
  const maxWidth=width*.78;
  const lines:string[]=[];
  let line='';
  for(const character of text){const next=line+character;if(context.measureText(next).width>maxWidth&&line){lines.push(line);line=character;}else line=next;}
  if(line)lines.push(line);
  const visible=lines.slice(0,Math.max(1,Math.floor(height/(fontSize*1.35))-1));
  const startY=height/2-((visible.length-1)*fontSize*1.25)/2;
  visible.forEach((item,index)=>context.fillText(item,width/2,startY+index*fontSize*1.25));
  const tags=[includeMascot?'MASCOT':'',includeLogo?'LOGO':''].filter(Boolean).join('  ·  ');
  if(tags){context.font=`600 ${Math.max(11,Math.round(fontSize*.28))}px monospace`;context.fillStyle='#39e6ff';context.fillText(tags,width/2,height-Math.max(18,height*.08));}
  setPreview({url:canvas.toDataURL('image/png'),fileName:`${type}-${width}x${height}.png`,width,height});
 }

 function downloadPng(){
  if(!preview)return;
  const link=document.createElement('a');
  link.href=preview.url;link.download=preview.fileName;link.click();
 }

 return <section className="workspace-card">
  <div className="workspace-section-title"><span>01</span><div><h2>内容设置</h2><p>参考网址：{source||'未提供'}</p></div></div>
  <div className="workspace-fields">
   <fieldset className="size-field workspace-wide"><legend>尺寸</legend><div className="size-options">
    <label className={sizeMode==='auto'?'active':''}><input type="radio" name="size-mode" checked={sizeMode==='auto'} onChange={()=>setSizeMode('auto')}/><span>自动</span><small>{defaultSize}</small></label>
    <label className={sizeMode==='custom'?'active':''}><input type="radio" name="size-mode" checked={sizeMode==='custom'} onChange={()=>setSizeMode('custom')}/><span>自定义</span></label>
   </div>{sizeMode==='custom'&&<div className="custom-size-inputs"><label><span>宽度</span><input type="number" min="1" max="8192" inputMode="numeric" value={customWidth} onChange={e=>setCustomWidth(e.target.value)} /></label><span aria-hidden="true">×</span><label><span>高度</span><input type="number" min="1" max="8192" inputMode="numeric" value={customHeight} onChange={e=>setCustomHeight(e.target.value)} /></label><small>px</small></div>}</fieldset>
   <label className="workspace-wide"><span>内容</span><textarea aria-label="内容" value={content} onChange={e=>setContent(e.target.value)} rows={7}/></label>
  </div>
  <div className="workspace-section-title workspace-assets-title"><span>02</span><div><h2>素材选项</h2><p>选择这次设计需要使用的素材。</p></div></div>
  <div className="asset-options">
   <label className={includeMascot?'asset-option active':'asset-option'}><input type="checkbox" checked={includeMascot} onChange={e=>setIncludeMascot(e.target.checked)}/><span className="asset-check">{includeMascot?'✓':''}</span><strong>Mascot</strong></label>
   <label className={includeLogo?'asset-option active':'asset-option'}><input type="checkbox" checked={includeLogo} onChange={e=>setIncludeLogo(e.target.checked)}/><span className="asset-check">{includeLogo?'✓':''}</span><strong>Logo</strong></label>
  </div>
  {downloadError&&<p className="download-error" role="alert">{downloadError}</p>}
  <div className="workspace-actions"><button type="button" onClick={createPreview}>生成 <span aria-hidden="true">↗</span></button></div>
  {preview&&<section className="image-preview" aria-labelledby="preview-title"><div className="image-preview-heading"><div><span>03 / PREVIEW</span><h2 id="preview-title">图片预览</h2></div><button type="button" onClick={downloadPng}>下载 PNG <span aria-hidden="true">↓</span></button></div><div className="image-preview-stage"><img src={preview.url} width={preview.width} height={preview.height} alt={`${name} 图片预览`}/></div><small>{preview.width} × {preview.height} px</small></section>}
 </section>;
}
