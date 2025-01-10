<script lang="ts" setup>

const barHeight = ref(0);
const barWidth = ref(0);

defineProps({
  isAxisY: {
    type: Boolean,
    default: false,
  },
  isAxisX: {
    type: Boolean,
    default: false,
  },
});

let resizeObserver = null as ResizeObserver | null;

const initResizeObserver = (el: HTMLElement) => {
  resizeObserver = new ResizeObserver(() => {
    barHeight.value = el.clientHeight;
    barWidth.value = el.clientWidth;
  });
  resizeObserver.observe(el);
};

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

const {barSize} = useBarSize();
</script>
<template>
  <div
    :class="{
      [st.barY]: isAxisY,
      [st.barX]: isAxisX,
    }"
    :style="{
      ...(isAxisY ? { 
        width: barSize + 'px',
      } : {}),
      ...(isAxisX ? { 
        height: barSize + 'px',
      } : {}),
    }"
    :ref="(e) => {
      if (e) {
        const el = e as HTMLElement;
        barHeight = el.clientHeight;
        barWidth = el.clientWidth;
        initResizeObserver(el);
      }
    }"
  >
    <ScrollbarThumb :barHeight :barWidth :isAxisY :isAxisX  />
  </div>
</template>

<style module="st">
.barY {
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  background: #000;
  z-index: 10;
  height: calc(100% - 0rem);
  display: flex;
  justify-content: center;
}
.barX {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1rem;
  background: #000;
  z-index: 10;
  width: calc(100% - 0rem);
  display: flex;
  align-items: center;
}
</style>
