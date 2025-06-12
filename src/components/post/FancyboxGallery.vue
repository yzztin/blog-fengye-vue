<!-- 
实现图片灯箱效果：查看大图、图片间切换、图片显示说明等
-->

<script setup lang="ts">
import { onMounted } from 'vue'
import Fancybox from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

interface ImageElement extends HTMLImageElement {
    alt: string
    title: string
    src: string
}

onMounted(() => {
    const postContents = document.querySelectorAll('.post-content')

    postContents.forEach((content, index) => {
        const images = content.querySelectorAll('img')

        images.forEach((img) => {
            const imageElement = img as ImageElement
            const parent = imageElement.parentElement

            // 如果图片已经被包装或父元素是链接，则跳过
            if (parent?.classList.contains('fancybox') || parent?.tagName === 'A') return

            const alt = imageElement.alt
            const title = imageElement.title

            // 添加说明文字
            if (alt) {
                const altSpan = document.createElement('span')
                altSpan.className = 'fancybox-alt'
                altSpan.textContent = alt
                imageElement.after(altSpan)
            } else if (title) {
                const titleSpan = document.createElement('span')
                titleSpan.className = 'fancybox-title'
                titleSpan.textContent = title
                imageElement.after(titleSpan)
            }

            // 包装图片
            const wrapper = document.createElement('a')
            wrapper.className = 'fancybox-img'
            wrapper.href = imageElement.src
            wrapper.setAttribute('data-fancybox', 'gallery')
            wrapper.setAttribute('data-caption', title)

            imageElement.parentNode?.insertBefore(wrapper, imageElement)
            wrapper.appendChild(imageElement)
        })

        // 设置图片组
        const fancyboxImages = content.querySelectorAll('.fancybox')
        fancyboxImages.forEach((img) => {
            img.setAttribute('rel', `article${index}`)
        })
    })

    // 初始化 Fancybox
    Fancybox.bind('[data-fancybox="gallery"]', {
        // 配置选项
    })
})
</script>

<style scoped>
.fancybox-alt,
.fancybox-title {
    display: block;
    margin-top: 0.5rem;
    text-align: center;
    color: #666;
}
</style>