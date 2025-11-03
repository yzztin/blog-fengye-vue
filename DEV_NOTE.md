## 前端开发基本说明

1. `pnpm install` 会安装 package.json 中定义的依赖包
2. `pnpm run xxx` 会执行 package.json 中 scripts 项定义的 xxx 命令，pnpm 会自动把项目中安装的依赖（也就是 node_modules/.bin/ 目录下的可执行文件）临时加入到环境变量 PATH 中
3. vite 是一个打包工具，只是负责把用 vue、react 等这类框架写的代码“转换”为浏览器可读的 html、css、js 代码
   1. `pnpm run dev` 实际上是使用 vite 启动一个 web 服务进程，这会把用 vue 等框架写的代码转变为浏览器可读的代码，并且实现代码修改后的“热更新”，但事实上执行前端代码的运行时还是浏览器本身
   2. `pnpm run build` 把项目代码全部打包为浏览器直接可读的代码，输出到 ./dist 文件夹下
4. 常规的前后端分离项目中，前后端的数据交互、接口请求流程大致为：用户浏览器展示 html 界面 -> 请求后端服务的 api 接口，接口请求是用户浏览器发起的，用户浏览器环境是一定需要可以访问到后端接口服务的
5. 当访问网页跟路径时，实际上渲染的是 ./index.html 文件，该文件下定义了 `<script type="module" src="/src/main.ts"></script>` 这会去加载 ./src/main.ts 作为入口 js 代码文件，再渲染得到实际的页面效果
6. `vite.config.ts` 是执行 vite 的配置文件，可以配置 vite 启动前端服务的主机地址和端口等等
7. `./public` 文件夹里的内容会原封不动的输出到打包得到的 ./dist 文件夹下，在浏览器上直接以“跟路径”访问，比如 ./public/images/1.jpg，在浏览器上就是直接 /images/1.jpg 就可以访问ß

## 项目代码说明

### 用到的技术
- vue3 + TypeScript 组合式 api
- vue router 路由管理
- Tailwind CSS 样式框架
- Pinia 状态管理
- pnpm 依赖管理

### 目录结构

**`./src` 目录下为项目的全部代码**

```
├── src
│   ├── main.ts         # vue 应用实例的入口代码
│   ├── App.vue         # 入口组件
│   ├── components      # 具体的组件
│   ├── composables     # 可组合函数
│   ├── assets          # 资源
│   ├── plugins         # 工具插件等
│   ├── router          # 路由配置
│   ├── stores          # 状态管理
│   ├── styles          # css 样式
│   ├── types           # ts 类型定义
│   ├── views           # 页面组件
│   └── vite-env.d.ts   # 类型声明
├── index.html          # 浏览器加载的 html 入口文件
```

1. `main.ts` 是入口文件，引入了需要使用的依赖实例，比如 vue 的入口实例对象 createApp、路由实例 router、状态管理实例 store 等等
2. `App.vue` 是 vue 的“根组件”文件，所有的子组件都会挂载到该组件，使用一个特殊的组件 RouterView 路由到其他页面和组件中，这需要配合 router/index.ts 中的 createRouter 使用
3. `vite-env.d.ts` 是用于 ts 代码的类型声明
4. `./src/components` 存放编写的所有的 vue 组件样式，比如页面中的 “分割线、页脚显示的版权信息、社交媒体链接” 等等大大小小的样式，这里是最终 html、css 代码的主要本体
5. `./src/composables` 存放 “组合式函数”，把项目中可以复用的逻辑代码写在这里，比如 “监控浏览器窗口大小、状态管理如登录用户的身份验证、请求接口的逻辑代码” 等
6. `./src/plugins` 项目需要的额外插件的实现，比如 “渲染 markdown 文件”
7. `./src/router` 定义用户请求的路径地址，不同的地址有不同的入口组件
8. `./src/stores` 状态管理，“状态”可以理解为全局变量，存储在用户浏览器环境中
9. `./src/styles` 这里是 tailwindcss 用到的样式，比如颜色、自定义的“标签class”的样式等
10. `./src/types` 存放项目中需要的数据模型定义，ts 代码的 interface 接口数据模型
11. `./src/views` 存放“页面级组件”，也就是路由到不同路径时展示的页面内容，比如 “首页、文章详情页、登录注册页、用户个人中心页” 等等，这些代码大多是使用了 ./src/components 里写的组件，再额外加一些页面需要的某些内容，文件夹一般也会命名为 pages


## 其他

### vscode 插件

- JavaScript Debugger
- Auto Close Tag
- Auto Rename Tag
- Color Highlight
- CSS Peek
- ESLint
- HTML CSS Support
- indent-rainbow
- Live Server
- Path Intellisense
- PostCSS Language Support
- Tailwind CSS IntelliSense
- Vue - Official
- Vue 3 Snippets

### 问题记录

- 使用 `pnpm run build` 生成静态文件，再通过 `python -m http.server --directory dist` 启动 web 服务后，可以从网页的 `/`
  根路径下正常访问 `/posts`，但是直接进入 `http://xxx/posts` 出现找不到页面的问题，当使用 `pnpm run dev` 进入页面时没有问题
    - 本质原因是使用 `vue router` 的 `createWebHistory()` 创建的是 `单页面应用（SPA）`，只有一个`index.html`文件，使用
      `pnpm run dev` 开启的 web 服务是可以探测出这个是 `SPA` 应用的，会将未知路径比如 `/posts` 重新定向到 `index.html`
      ，然后由 `vue router` 在前端处理这些路径。但是静态文件服务器只会寻找比如 `/posts/index.html` 这样的文件，找不到于是就返回无页面。
    - 此处会把`dist`的静态文件上传到 `gh-pages`，由于`gh-pages`服务器在找不到文件时会自动寻找和显示 `404.html`
      的内容，因此，此处的解决办法是给一个特殊的 `404.html` （详见 ./pubilc/404.html）让其重定向到根目录的 `/index.html`
      并保留路径地址，再重新跳转到对应的路径。

- busuanzi 服务端 502 的问题导致网页加载很慢（浏览器页面的图标一直转圈）
