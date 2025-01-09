<!-- BarX.vue -->
<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, type Ref, type PropType, computed } from "vue";

const props = defineProps({
    barSize: {
        type: Number || String,
        default: 16,
    },
    thumbSize: {
        type: Number || String,
        default: 10,
    },
    thumbColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.5)",
    },
    showScrollbarX: {
        type: Boolean,
        required: true,
    },
    onlyX: {
        type: Boolean,
        required: true,
    },
    scrollWidth: {
        type: Number,
        required: true,
    },
    scrollLeft: {
        type: Number,
        required: true,
    },
});

const contentWidth = computed(() => props.scrollWidth <= 0 ? 0.0001 : props.scrollWidth); 

const scrollbarXRef = ref(null) as Ref<HTMLElement | null>;
const thumbXRef = ref(null) as Ref<HTMLElement | null>;
const isDraggingX = ref(false);
const startX = ref(0);
const startScrollLeft = ref(0);

const thumbXWidth = () => {
    if (scrollbarXRef.value?.clientWidth) return (Math.pow(scrollbarXRef.value?.clientWidth, 2)/contentWidth.value).toFixed(4) + "px";
    return props.thumbSize + 'px';
};

const thumbXPos = () => {
    const contentEl = props.contentElRef;
    const scrollbarX = scrollbarXRef.value;
    if (!contentEl || !scrollbarX) return "0px";
    const scrollbarWidth = scrollbarX.clientWidth;
    const contentScrollLeft = contentEl.scrollLeft;
    const contentWidth = contentEl.scrollWidth;
    return ((contentScrollLeft / contentWidth) * scrollbarWidth).toFixed(4) + "px";
};

const handleScrollX = () => {
    if (thumbXRef.value)
        thumbXRef.value.style.transform = `translateX(${thumbXPos()})`;
};

const handlePointerMoveX = (e: PointerEvent) => {
    e.preventDefault();
    if (!isDraggingX.value) return;
    const contentEl = props.contentElRef;
    const scrollbarX = scrollbarXRef.value;
    if (!contentEl || !scrollbarX) return;
    const deltaX = e.clientX - startX.value;
    const scrollbarWidth = scrollbarX.clientWidth;
    const contentWidth = contentEl.scrollWidth;
    const newScrollLeft = startScrollLeft.value + (deltaX / scrollbarWidth) * contentWidth;
    contentEl.scrollLeft = newScrollLeft;
    if (thumbXRef.value)
        thumbXRef.value.style.transform = `translateX(${thumbXPos()})`;
};

const handlePointerDownX = (e: PointerEvent) => {
    e.preventDefault();
    isDraggingX.value = true;
    startX.value = e.clientX;
    const contentEl = props.contentElRef;
    if (contentEl) startScrollLeft.value = contentEl.scrollLeft;
    window.addEventListener("pointermove", handlePointerMoveX);
    window.addEventListener("pointerup", handlePointerUpX);
};

const handlePointerUpX = () => {
    isDraggingX.value = false;
    window.removeEventListener("pointermove", handlePointerMoveX);
    window.removeEventListener("pointerup", handlePointerUpX);
};

const init = () => {
    if (!scrollbarXRef.value || !thumbXRef.value) return;
    thumbXRef.value.style.width = thumbXWidth();
};

onMounted(() => {
    init();
    window.addEventListener("resize", init);
    window.addEventListener("load", init);
    window.addEventListener("orientationchange", init);
});

onUnmounted(() => {
    window.removeEventListener("resize", init);
    window.removeEventListener("load", init);
    window.removeEventListener("orientationchange", init);
});

watch(
    () => props.showScrollbarX,
    () => {
        init();
    }
);
</script>

<template>
    <div :class="[st.scrollbarX]" ref="scrollbarXRef" :style="{
        opacity: props.showScrollbarX ? 1 : 0,
        right: props.onlyX ? '0' : '1rem',
        height: props.barSize,
    }">
        <div :class="[st.scrollbarXThumb]" ref="thumbXRef" :style="{
            height: props.thumbSize,
            backgroundColor: props.thumbColor,
        }" @pointerdown="handlePointerDownX" @pointerup="handlePointerUpX"></div>
    </div>
</template>

<style module="st">
.scrollbarX {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: transparent;
    overflow-y: hidden;
    display: flex;
    align-items: center;
}

.scrollbarXThumb {
    border-radius: 0.5rem;
    opacity: 0.5;
}

.scrollbarXThumb:hover {
    opacity: 1;
}
</style>