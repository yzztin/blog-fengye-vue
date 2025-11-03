<mark>开发详情参考：[DEV_NOTE](./DEV_NOTE.md)</mark>

## 使用 vue3 重写的 [fengye](https://github.com/chen-yingfa/hexo-theme-fengye) 主题

主要目的是学习 vue3 编程，用到的技术：

- vue3 + TypeScript 组合式 api
- vue router 路由管理
- Tailwind CSS 样式框架
- Pinia 状态管理
- pnpm 依赖管理

## 使用

- 下载本项目，进入项目目录
- 安装依赖：`pnpm install`
- 启动项目：`pnpm run dev`
- 构建项目：
    - 生成静态资源文件：`pnpm run build`
    - 可本地 web 服务器启动：安装依赖：`pnpm install -g serve`，随后执行：`serve -s dist`
- 将生成的静态资源文件 `./dist` 目录下的内容推送到 github pages 指定的分支下
    - 执行 `pnpm run deploy` 会在把 `./dist` 目录的内容推送到当前代码仓库的 `gh-pages` 分支（如果出现一直卡住的情况，可以尝试先创建一个名为
      `gh-pages` 的分支再次执行）
- 配置 Github Action 自动部署：
    - 将本项目源代码复制到个人仓库`<usernmae>.github.io`中`.github/workflows/CICD.yml.example`指定`push`的分支（如示例中是分支名称是
      `blog-code`）
    - 将 `.github/workflows/CICD.yml.example`，改为 `.github/workflows/CICD.yml`
    - 当工作流分支和部署的 `gh-pages` 分支是同一个仓库时，可以直接使用 `secrets.GITHUB_TOKEN `，需要在仓库设置中修改密钥权限：
      `Setting -> Actions General -> Workflow permissions -> Read and write permissions`
    - 每次修改代码或添加文章，只要 `push` 后就自动执行生成静态文件并放到`gh-pages`分支的流程

**具体的使用过程示例：**

1. 在 GitHub 上的个人特殊仓库 `<username>.github.io` 中导入完整的本仓库代码
2. 安装项目依赖，尝试运行项目，确保页面正常
3. 在 `public/posts` 下创建具体的文章，可参考 `./测速文章.md` 中的文章元数据
4. 执行 `pnpm run build` 和 `pnpm run deploy`，此时当前仓库的 `gh-pages` 分支应该就是完整的本地刚刚生成的 `./dist`
   文件夹下的内容
5. 设置 GitHub 仓库的 `GitHub Pages` 为 `gh-pages`
6. 访问 `https://<username>.github.io/`

## Time Line

- 2025.05.29 - 2025.06.05 学习和项目基本框架

- 2025.06.09-15

1. 不同页面动态标题
2. 文章、分类、标签页面，文章数据 mock
3. 文章字数统计、标签、分类显示、创建时间、更新时间

- 2025.6.23-30

1. 文章创建命令（❌）
2. 文章显示效果（md、代码块等等）
3. about

## All Thanks To Our Contributors

- [claude.ai](https://claude.ai/)
- [chatgpt](https://chatgpt.com/)
- [kimi](https://www.kimi.com/)
- [cursor](https://www.cursor.com/)
- [copilot](https://github.com/copilot)
