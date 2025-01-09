<script lang="ts" setup>
import { watch } from "vue";
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  type PropType,
  type Ref,
} from "vue";
import BarX from './BarX.vue';
import BarY from './BarY.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  direction: {
    type: String as PropType<"x" | "y" | "xy">,
    default: "xy",
  },
  barSize: {
    type: Number || String,
    default: 16,
  },
  barColor: {
    type: String,
    default: "transparent",
  },
  thumbSize: {
    type: Number || String,
    default: 10,
  },
  thumbColor: {
    type: String,
    default: "rgba(0, 0, 0, 0.5)",
  },
});

const scrollTop = ref(0);
const scrollLeft = ref(0);
const scrollHeight = ref(0);
const scrollWidth = ref(0);

const onlyX = computed(() => props.direction === "x");
const onlyY = computed(() => props.direction === "y");

const contentElRef = ref(null) as Ref<HTMLElement | null>;
const isHover = ref(false);

const init = () => {
  const contentEl = contentElRef.value;
  if (!contentEl) return;
  scrollHeight.value = contentEl.scrollHeight;
  scrollWidth.value = contentEl.scrollWidth;
  scrollTop.value = contentEl.scrollTop;
  scrollLeft.value = contentEl.scrollLeft;
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
  () => props.direction,
  () => {
    init();
  }
);
</script>

<template>
  <div
    :class="[st.wrapper]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div
      :class="[st.content, st.hideScrollbar]"
      :style="{
        overflowY: direction === 'y' || direction === 'xy' ? 'auto' : 'hidden',
        overflowX: direction === 'x' || direction === 'xy' ? 'auto' : 'hidden',
      }"
      ref="contentElRef"
    >
      <slot></slot>
    </div>
    <BarY
      v-if="!onlyX"
      :barSize="barSize"
      :thumbSize="thumbSize"
      :thumbColor="thumbColor"
      :showScrollbarY="isHover"
      :onlyY="onlyY"
      :contentElRef="contentElRef"
    />
    <BarX
      v-if="!onlyY"
      :barSize="barSize"
      :thumbSize="thumbSize"
      :thumbColor="thumbColor"
      :showScrollbarX="isHover"
      :onlyX="onlyX"
      :scrollWidth="scrollWidth"
      :scrollLeft="scrollLeft"
    />
  </div>
</template>

<style module="st">
.wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.hideScrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: auto !important;
}

.hideScrollbar::-webkit-scrollbar {
  display: none;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
