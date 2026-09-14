import { notFound } from 'next/navigation';
import Link from 'next/link';
import AssetForm from './asset-form';

const assetTypes:Record<string,{code:string;name:string;size:string}>={
 'home-banner':{code:'HB',name:'Home Banner',size:'600 × 300 px'},
 game:{code:'GM',name:'Game',size:'等待分析结果'},
 'packet-s':{code:'PS',name:'Packet S',size:'等待分析结果'},
 'packet-l':{code:'PL',name:'Packet L',size:'等待分析结果'},
};

export function generateStaticParams(){return Object.keys(assetTypes).map(type=>({type}));}

export default async function AssetWorkspace({params}:{params:Promise<{type:string}>}){
 const {type}=await params;
 const asset=assetTypes[type];
 if(!asset)notFound();
 return <main className="workspace-main">
  <header className="workspace-topbar"><Link href="/" className="workspace-back">← 返回</Link><div className="workspace-brand">SITE<span>LENS</span></div></header>
  <section className="workspace-intro"><div><div className="eyebrow">{asset.code} / ASSET WORKSPACE</div><h1>{asset.name}</h1><p>填写设计内容，并选择需要包含的素材。</p></div><span className="workspace-type">{asset.code}</span></section>
  <AssetForm type={type} name={asset.name} defaultSize={asset.size}/>
 </main>;
}
