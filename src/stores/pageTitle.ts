/**
 * pinia 状态管理，可以认为 “状态” 是一个高级的全局变量，关键特性是：组件间共享数据、跨组件通信、保持数据一致性
 * 1. 任何组件都能访问，并且是响应式的，值改变时会自动重新渲染
 * 2. 只能通过提前定义的 actions 里的方法修改状态
 */

import { defineStore } from 'pinia';
import { useBaseConfig } from '@/stores/useConfig'


// 定义一个 store，唯一值是 pageTitle
export const usePageTitleStore = defineStore('pageTitle', {

    // state 存储具体的数据，最好始终返回的数据是 object 类型
    state: () => {
        const baseConfig = useBaseConfig()  // 在 state 函数内部使用 store，在顶层使用会导致循环依赖问题
        return {
            baseTitle: baseConfig.title, // 主页面标题
            currentTitle: '', // 当前页面标题
        }
    },

    // actions 定义修改 state 的方法
    actions: {
        updateTitle(title: string | null | undefined) {
            if (title && title.trim()) {
                this.currentTitle = `${title} | ${this.baseTitle}`
            } else {
                this.currentTitle = this.baseTitle
            }
            document.title = this.currentTitle
        }
    }
})
