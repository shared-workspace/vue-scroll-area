<script lang="ts" setup>
const { setHover } = useHover();
</script>
<template>
    <div 
    @mouseenter="setHover(true)" @mouseleave="setHover(false)"
    :style="{
      position: 'relative',
      width: '100%',
      height: '100%',
    }"
    >
    <ScrollContentWrapper>
      <slot></slot>
    </ScrollContentWrapper>
    <ScrollBar :isAxisY="true" />
    <ScrollBar :isAxisX="true" />
  </div>
</template>
