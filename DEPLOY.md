# 部署到自己的平台

这个项目是普通的 Next.js 项目，不依赖 GPT Site。当前版本使用静态导出，执行 `pnpm build` 后会在 `out/` 生成可部署文件。

## 推荐：GitHub + Vercel

1. 在 GitHub 新建一个空仓库，例如 `sitelens`。
2. 把本项目推送到该仓库。
3. 登录 Vercel，选择 **Add New → Project**，导入这个 GitHub 仓库。
4. Framework Preset 选择 **Next.js**，其他设置保持默认，点击 Deploy。
5. 在 Vercel 的 Domains 页面绑定自己的域名。

以后每次推送到 GitHub，Vercel 会自动更新网站。

## GitHub Pages

当前静态模板版可以放到 GitHub Pages，但仓库子路径需要配置 `basePath`。如果以后加入 OpenAI API、网站自动分析或图片上传，GitHub Pages 不能运行这些后台功能，需要改用 Vercel、Cloudflare Workers 或自己的服务器。

## 接入 AI 时

接入自动网站分析前，需要：

1. 移除 `next.config.ts` 中的 `output: 'export'`。
2. 新增服务端 API 路由。
3. 在托管平台设置 `OPENAI_API_KEY`，不要写入代码或提交到 GitHub。
4. 加入身份验证、次数限制和错误处理，避免 API 被他人滥用。

## 本地运行

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的本地网址即可。
