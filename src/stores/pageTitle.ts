import { defineStore } from 'pinia';

export const usePageTitleStore = defineStore('pageTitle', {
    state: () => ({
        baseTitle: 'Yzz\' blog', // 主页面标题
        currentTitle: 'YZZ', // 当前页面标题
    }),
    actions: {
        updateTitle(title: string) {
            this.currentTitle = `${title} | ${this.baseTitle}`;
            document.title = this.currentTitle;
        },
    },
});