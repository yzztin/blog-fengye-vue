<template>
    <PostList :posts="currentPagePosts" />

    <!-- 分页 -->
    <!-- 定义一个自定义事件 update:page，当调用该事件时执行 updatePage 方法 -->
    <Paginator v-if="isPaginator" :pageInfo="pageInfo" @update:page="updatePage" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PostList from '@/components/post/PostList.vue'
import Paginator from '@/components/Paginator.vue';
import type { PageInfo } from '@/types/pageInfo'
import { usePostStore } from '@/stores/post'

// ref 响应式对象，当值被修改时，任何依赖它的组件也会自动重新渲染
const currentPage = ref(1);  // 当前页码

const pageSize = 10;  // 每页显示的文章数量

const postStore = usePostStore()

// computed 计算属性函数，返回一个只读的 ref 对象，当依赖的响应式对象变化时会自动重新计算
const isPaginator = computed(() => postStore.posts.length > pageSize);  // 是否需要分页

const currentPagePosts = computed(() => {  // 当前页的文章
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return postStore.posts.slice(start, end);
});

const pageInfo = computed<PageInfo>(() => ({  // 分页信息
    current: currentPage.value,
    total: Math.ceil(postStore.posts.length / pageSize),
}));

const updatePage = (newPage: number) => {  // 更新当前页码
    currentPage.value = newPage;
};

// onMounted 生命周期钩子函数，在组件挂载后执行代码
onMounted(async () => {
    await postStore.fetchPosts()
})

</script>
<style scoped></style>