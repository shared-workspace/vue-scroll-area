<script lang="ts" setup>
import type { PropType } from 'vue';

const props = defineProps({
  direction: {
    type: String as PropType<'none' | 'y' | 'x' | 'both'>,
    default: 'both',
  },
  barSize: {
    type: Number || String,
    default: 26,
  },
  thumbSize: {
    type: Number,
    default: 20,
    min: 0,
    max: 100,
  }
});

const {setScrollDirection} = useScrollDirection();

setScrollDirection(props.direction);
watchEffect(() => {
  setScrollDirection(props.direction);
});

const {setBarSize} = useBarSize();
setBarSize(props.barSize);
watchEffect(() => {
  setBarSize(props.barSize);
});

const {setThumbSize} = useThumbSize();
setThumbSize(props.thumbSize);
watchEffect(() => {
  setThumbSize(props.thumbSize);
});
</script>
<template>
  <ScrollAreaWrapper>
    <slot></slot>
  </ScrollAreaWrapper>
</template>
