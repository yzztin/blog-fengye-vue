/**
 * 这是一个类型声明文件，只在开发和编译阶段使用
 * 目的是让 typescript 能够正确的识别类型检查
 */

// 三斜线指令，这表示引入 vite 官方提供的类型声明文件，不然 import.meta.env 等符号会报错
/// <reference types="vite/client" />

// 手动添加某个模块的类型声明，某些包没有内置 ts 类型文件，如下声明让 ts 不再报错
declare module 'markdown-it-copy';
