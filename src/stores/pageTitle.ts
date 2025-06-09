import { defineStore } from 'pinia';
import { useBaseConfig } from '@/stores/useConfig'




export const usePageTitleStore = defineStore('pageTitle', {
    state: () => {
        // 在 state 函数内部使用 store，如果在顶层使用会导致循环依赖问题
        const baseConfig = useBaseConfig()
        return {
            baseTitle: baseConfig.title, // 主页面标题
            currentTitle: '', // 当前页面标题
        }
    },
    actions: {
        updateTitle(title: string) {
            title = title.charAt(0).toUpperCase() + title.slice(1);  // 首字母大写
            this.currentTitle = `${title} | ${this.baseTitle}`;
            document.title = this.currentTitle;
        }
    }
})