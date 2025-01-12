<script lang="ts" setup>
import type { CSSProperties, PropType } from "vue";

const props = defineProps({
  axis: {
    type: String as PropType<"none" | "y" | "x" | "both">,
    default: "both",
  },
  bar: {
    type: Object as PropType<{ size?: number, transparent?: boolean }>,
    default: () => ({ size: 16, transparent: false }),
  },
  thumb: {
    type: Object as PropType<{ size?: number; rounded?: boolean, color?: CSSProperties["color"] }>,
    default: () => ({ size: 8, rounded: false, color: "black" }),
  },
});

const {
  barSize,
  setBarSize,
  barTransparent,
  setBarTransparent,
  thumbSize,
  setThumbSize,
  thumbRound,
  setThumbRound,
  thumbColor,
  setThumbColor,
  setScrollDirection,
  setHover,
  setContentClientSize,
  setContentScrollSize,
  setContentScrollPosition,
  contentClientHeight,
  contentClientWidth,
  thumbYHeight,
  thumbYTop,
  showBarY,
  isAxisY,
  thumbXWidth,
  thumbXLeft,
  showBarX,
  isAxisX,
} = useScrollArea();

setScrollDirection(props.axis);
watchEffect(() => setScrollDirection(props.axis));

setBarSize(props.bar.size!);
watchEffect(() => setBarSize(props.bar.size!));

setBarTransparent(props.bar.transparent!);
watchEffect(() => setBarTransparent(props.bar.transparent!));

setThumbSize(props.thumb.size!);
watchEffect(() => setThumbSize(props.thumb.size!));

setThumbRound(props.thumb.rounded!);
watchEffect(() => setThumbRound(props.thumb.rounded!));

setThumbColor(props.thumb.color!);
watchEffect(() => setThumbColor(props.thumb.color!));

let contentBoxResizeObserver = null as ResizeObserver | null;

const initResizeObserver = (el: HTMLElement) => {
  setContentClientSize(el.clientWidth, el.clientHeight);
  setContentScrollSize(el.scrollWidth, el.scrollHeight);
  contentBoxResizeObserver = new ResizeObserver(() => {
    setContentClientSize(el.clientWidth, el.clientHeight);
    setContentScrollSize(el.scrollWidth, el.scrollHeight);
  });
  contentBoxResizeObserver.observe(el);
};

onUnmounted(() => {
  if (contentBoxResizeObserver) {
    contentBoxResizeObserver.disconnect();
    contentBoxResizeObserver = null;
  }
});
</script>
<template>
  <div
    @mouseenter="setHover(true)"
    @mouseleave="setHover(false)"
    :class="st.wrapper"
  >
    <div
      :ref="(e) => {
        if (e) {
            const el = e as HTMLElement;
            initResizeObserver(el);
        }
    }"
      @wheel="(e) => {
        const el = e.target as HTMLElement;
        if (el) setContentScrollPosition(el.scrollLeft, el.scrollTop);

    }"
      @scroll="(e) => {
        const el = e.target as HTMLElement;
        if (el) setContentScrollPosition(el.scrollLeft, el.scrollTop);

    }"
      :class="[
        st.content,
        { [st.overflowY]: isAxisY, [st.overflowX]: isAxisX },
      ]"
    >
      <slot></slot>
    </div>
    <div
      v-if="showBarY"
      :class="st.barY"
      :style="{
        width: barSize + 'px',
        height: contentClientHeight + 'px',
        ...(barTransparent ? { backgroundColor: 'transparent' } : {}),
      }"
    >
      <div
        :class="st.thumbY"
        :style="{
          width: thumbSize + 'px',
          height: thumbYHeight + 'px',
          transform: `translateY(${thumbYTop}px)`,
          borderRadius: thumbRound ? thumbSize / 2 + 'px' : '0',
          backgroundColor: thumbColor,
        }"
      ></div>
    </div>
    <div
      v-if="showBarX"
      :class="st.barX"
      :style="{
        height: barSize + 'px',
        width: contentClientWidth + 'px',
        ...(barTransparent ? { backgroundColor: 'transparent' } : {}),
      }"
    >
      <div
        :class="st.thumbX"
        :style="{
          height: thumbSize + 'px',
          width: thumbXWidth + 'px',
          transform: `translateX(${thumbXLeft}px)`,
          borderRadius: thumbRound ? thumbSize / 2 + 'px' : '0',
          backgroundColor: thumbColor,
        }"
      ></div>
    </div>
  </div>
</template>

<style module="st">
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.content::-webkit-scrollbar {
  display: none;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: auto !important;
  overflow: scroll;
  z-index: 9;
  overflow: hidden;
}

.content.overflowY {
  overflow-y: scroll;
}

.content.overflowX {
  overflow-x: scroll;
}

.barY {
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  background: #000;
  z-index: 10;
  display: flex;
  justify-content: center;
  overflow: hidden;
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
  overflow: hidden;
}

.thumbY {
}
.thumbX {
}
</style>
