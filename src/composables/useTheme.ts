import { ref, watch } from 'vue'

export function useTheme() {
    const isDark = ref(document.documentElement.classList.contains('dark'))

    const toggleTheme = () => {
        isDark.value = !isDark.value
    }

    watch(isDark, (newValue) => {
        if (newValue) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    })

    return {
        isDark,
        toggleTheme
    }
} 