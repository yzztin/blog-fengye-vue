import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    // postcss 是一个 css 转换器，tailwindcss 是 postcss 的一个插件，
    // postcss 可以识别 tailwindcss 语法并将其转为浏览器可以读取的原生 css 样式
    postcss: './postcss.config.js'
  },
  resolve: {
    // 设置路径别名，这表示使用符号 “@” 来代替项目根目录下的 src 目录路径
    alias: {
      '@': path.resolve(__dirname, './src')  // resolve() 表示合并目录得到一个绝对路径
    },
  },
  assetsInclude: ['**/*.md'], // 将 .md 文件视为静态资源
  // 确保 glob 导入工作正常
  optimizeDeps: {
    exclude: ['@/assets/_posts/*.md']
  },
  // 配置启动 web 服务器的选项
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})


/**
 * 要想在 vite 自动加载 .env 之前就使用环境变量，需要手动加载 .env 文件
 * 参考如下代码
 */
// import { loadEnv } from 'vite'

// export default ({ mode }: { mode: string }) => {
//   const env = loadEnv(mode, process.cwd())
//   console.log(env)

//   return defineConfig({
//     base: env.VITE_BASE_PATH || '/', // 静态资源前缀
//     server: {
//       host: env.VITE_HOST,
//       port: Number(env.VITE_PORT),       // 指定端口
//       strictPort: true   // 如果端口被占用就报错，不自动换端口
//     }
//   })
// }
