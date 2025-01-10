<script lang="ts" setup>
const props = defineProps({
  barHeight: {
    type: Number,
    default: 0,
  },
  barWidth: {
    type: Number,
    default: 0,
  },
  isAxisX: {
    type: Boolean,
    default: false,
  },
  isAxisY: {
    type: Boolean,
    default: false,
  },
});

const {contentHeight, contentWidth} = useContentSize();
const {contentLeft, contentTop} = useContentPosition();
const {thumbSize} = useThumbSize();
</script>
<template>
  <div 
    :class="{
      [st.thumbY]: isAxisY,
      [st.thumbX]: isAxisX,
    }"
    :style="{
      ...(isAxisY ? { 
        height: ((barHeight / contentHeight) * barHeight).toFixed(3) + 'px',
        width: thumbSize + '%',
      } : {}),
      ...(isAxisX ? { 
        width: ((barWidth / contentWidth) * barWidth).toFixed(3) + 'px',
        height: thumbSize + '%',
      } : {}),
      transform: isAxisY ? 
      `translateY(${(contentTop / contentHeight) * barHeight}px)` : 
      `translateX(${(contentLeft / contentWidth) * barWidth}px)`,
      }"
    ></div>
</template>

<style module="st">
.thumbY {
  background: white;
}
.thumbX {
  background: white;
}
</style>
