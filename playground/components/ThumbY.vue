<script lang="ts" setup>
const props = defineProps({
  height: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div 
    :class="st.thumbY"
    :style="{ height }"
    ></div>
</template>

<style module="st">
.thumbY {
  width: 10px;
  margin: 0 auto;
  background: white;
}
</style>
