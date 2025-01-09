<script lang="ts" setup>
const barYheight = ref(0);
const { contentHeight } = useContentSize();
const thumbYHeight = computed(() =>  ((barYheight.value / contentHeight.value) * barYheight.value).toFixed(3) + "px");

</script>
<template>
  <div
    :class="st.barY"
    :ref="(e) => {
        if (!e) return;
        const el = e as HTMLElement;
        barYheight = el.clientHeight;
      }"
  >
    <ThumbY :height="thumbYHeight" />
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
}
</style>
