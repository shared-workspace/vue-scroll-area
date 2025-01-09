<script lang="ts" setup>
let resizeObserver = null as ResizeObserver | null;
const { setContentSize } = useContentSize();
const initResizeObserver = (el: HTMLElement) => {
  resizeObserver = new ResizeObserver(() =>
    setContentSize(el.scrollWidth, el.scrollHeight)
  );
  resizeObserver.observe(el);
};

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
const { setContentPosition } = useContentPosition();
const { overflowDirection } = useScrollDirection();
</script>

<template>
  <div
    :ref="(e) => {
        if (e) {
            const target = e as HTMLElement;
            setContentSize(target.scrollWidth, target.scrollHeight);
            initResizeObserver(target);
        }
    }"
    @wheel="(e) => {
        const target = e.target as HTMLElement;
        if (target) {
            setContentPosition(target.scrollLeft, target.scrollTop);
        }
    }"
    @scroll="(e) => {
        const target = e.target as HTMLElement;
        if (target) {
            setContentPosition(target.scrollLeft, target.scrollTop);
        }
    }"
    :style="{
        ...overflowDirection
    }"
    :class="st.content"
  >
    <slot></slot>
  </div>
</template>

<style module="st">
.content {
  position: relative;
  width: 100%;
  height: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: auto !important;
  overflow: scroll;
  z-index: 9;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>
