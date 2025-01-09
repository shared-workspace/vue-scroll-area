<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, type Ref, type PropType } from "vue";

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
  showScrollbarY: {
    type: Boolean,
    required: true,
  },
  onlyY: {
    type: Boolean,
    required: true,
  },
  contentElRef: {
    type: Object as PropType<HTMLElement | null>,
    required: true,
  },
});

const scrollbarYRef = ref(null) as Ref<HTMLElement | null>;
const thumbYRef = ref(null) as Ref<HTMLElement | null>;
const isDraggingY = ref(false);
const startY = ref(0);
const startScrollTop = ref(0);

const thumbYHeight = () => {
  const contentEl = props.contentElRef;
  const scrollbarY = scrollbarYRef.value;
  if (!contentEl || !scrollbarY) return "0px";
  const contentHeight = contentEl.scrollHeight;
  const scrollbarHeight = scrollbarY.clientHeight;
  return ((scrollbarHeight / contentHeight) * scrollbarHeight).toFixed(4) + "px";
};

const thumbYPos = () => {
  const contentEl = props.contentElRef;
  const scrollbarY = scrollbarYRef.value;
  if (!contentEl || !scrollbarY) return "0px";
  const scrollbarHeight = scrollbarY.clientHeight;
  const contentScrollTop = contentEl.scrollTop;
  const contentHeight = contentEl.scrollHeight;
  return ((contentScrollTop / contentHeight) * scrollbarHeight).toFixed(4) + "px";
};

const handleScrollY = () => {
  if (thumbYRef.value)
    thumbYRef.value.style.transform = `translateY(${thumbYPos()})`;
};

const handlePointerMoveY = (e: PointerEvent) => {
  e.preventDefault();
  if (!isDraggingY.value) return;
  const contentEl = props.contentElRef;
  const scrollbarY = scrollbarYRef.value;
  if (!contentEl || !scrollbarY) return;
  const deltaY = e.clientY - startY.value;
  const scrollbarHeight = scrollbarY.clientHeight;
  const contentHeight = contentEl.scrollHeight;
  const newScrollTop = startScrollTop.value + (deltaY / scrollbarHeight) * contentHeight;
  contentEl.scrollTop = newScrollTop;
  if (thumbYRef.value) 
    thumbYRef.value.style.transform = `translateY(${thumbYPos()})`;
};

const handlePointerDownY = (e: PointerEvent) => {
  e.preventDefault();
  isDraggingY.value = true;
  startY.value = e.clientY;
  const contentEl = props.contentElRef;
  if (contentEl) startScrollTop.value = contentEl.scrollTop;
  window.addEventListener("pointermove", handlePointerMoveY);
  window.addEventListener("pointerup", handlePointerUpY);
};

const handlePointerUpY = () => {
  isDraggingY.value = false;
  window.removeEventListener("pointermove", handlePointerMoveY);
  window.removeEventListener("pointerup", handlePointerUpY);
};

const init = () => {
  if (!scrollbarYRef.value || !thumbYRef.value) return;
  thumbYRef.value.style.height = thumbYHeight();
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
  () => props.showScrollbarY,
  () => {
    init();
  }
);
</script>

<template>
  <div
    :class="[st.scrollbarY]"
    ref="scrollbarYRef"
    :style="{
      opacity: props.showScrollbarY ? 1 : 0,
      bottom: props.onlyY ? '0' : '1rem',
      width: props.barSize,
    }"
  >
    <div
      :class="[st.scrollbarYThumb]"
      ref="thumbYRef"
      :style="{
        width: props.thumbSize,
        backgroundColor: props.thumbColor,
      }"
      @pointerdown="handlePointerDownY"
      @pointerup="handlePointerUpY"
    ></div>
  </div>
</template>

<style module="st">
.scrollbarY {
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  overflow-x: hidden;
}

.scrollbarYThumb {
  margin: 0 auto;
  border-radius: 0.5rem;
  opacity: 0.5;
}

.scrollbarYThumb:hover {
  opacity: 1;
}
</style>
