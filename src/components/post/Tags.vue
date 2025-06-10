<template>
    <!-- 显示特定标签的文章 -->
    <div v-if="isTagPage" class="mt-6">
        <div class="flex flex-wrap gap-1 justify-center items-center">
            <div class="
                tag
                mt-6
                text-lg
                rounded-full
                px-3
                py-1
                border-2
                border-[var(--c-theme)]
                text-[var(--c-theme)]
                bg-[var(--c-0)]
                dark:bg-[var(--c-0)]
                dark:drop-shadow-none">
                {{ currentTag }}
            </div>
        </div>
        <PostList :posts="tagPosts" />
    </div>

    <!-- 显示所有标签 -->
    <div v-else class="flex flex-col gap-2 px-6 max-w-prose mx-auto md:px-0 my-8">
        <div class="flex flex-row items-center gap-2">
            <Icon width="28" :icon="tagsIcon" />
            <h2 class="font-bold text-2xl">Tags</h2>
        </div>
        <div class="tags-container flex flex-wrap gap-1 mt-2">
            <router-link v-for="(tag, index) in tags" :key="index" :to="`/tags/${tag.tagName}`" class="
                tag flex flex-row items-center text-[16px] px-[8px] py-[2px] 
                rounded-full drop-shadow-md border-[1px] border-[var(--c-theme)] 
                text-[var(--c-theme)] bg-[var(--c-0)] dark:bg-[var(--c-0)] 
                dark:drop-shadow-none hover:bg-[var(--c-theme)] dark:hover:bg-[var(--c-theme)] 
                hover:text-[var(--c-0)]">
                #{{ tag.tagName }}
                <span
                    class="text-[var(--c-50)] dark:text-[var(--c-70)] hover:dark:text-[var(--c-80)] hover:text-[var(--c-20)] pl-1 text-sm">
                    × {{ tag.count }}
                </span>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue';
import PostList from '@/components/post/PostList.vue'
import { useHeaderStore } from '@/stores/useConfig'
import { usePostStore } from '@/stores/post'

const route = useRoute()
const headerStore = useHeaderStore()
const postStore = usePostStore()

// 获取 Tags 对应的图标
const tagsIcon = computed(() => {
    const item = headerStore.navItems.find((item) => item.name === 'Tags');
    return item?.icon || 'mingcute:tag-fill'; // 如果找不到，返回默认图标
});

onMounted(async () => {
    await postStore.fetchPosts()
})

const isTagPage = computed(() => route.path.startsWith('/tags/'))
console.log("isTagPage", isTagPage)

// 当前标签
const currentTag = computed(() => {
    if (isTagPage.value) {
        return route.params.tag as string;
    }
    return '';
})

// 所有标签
const tags = computed(() => {
    // 获取所有标签并展平为一维数组
    const allTags = postStore.posts.flatMap(post => post.tags || []);
    // 去重
    const uniqueTags = [...new Set(allTags)];

    // 为每个标签统计文章数量
    const tagCount = uniqueTags.map((tagName) => ({
        tagName,
        count: postStore.posts.filter((post) => post.tags?.includes(tagName)).length,
    }));

    return tagCount;
})

// 获取某个标签的所有文章
const tagPosts = computed(() => {
    if (!currentTag.value) return [];
    return postStore.posts.filter(post => post.tags?.includes(currentTag.value));
})

</script>

<style scoped></style>