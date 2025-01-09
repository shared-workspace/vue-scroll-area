<script lang="ts" setup>
import type { PropType } from 'vue';

const props = defineProps({
  direction: {
    type: String as PropType<'none' | 'y' | 'x' | 'both'>,
    default: 'both',
  },
  barSize: {
    type: Number || String,
    default: 16,
  },
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
</script>
<template>
  <ScrollAreaWrapper>
    <slot></slot>
  </ScrollAreaWrapper>
</template>
