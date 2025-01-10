<script lang="ts" setup>
const { contentLeft, contentTop } = useContentPosition();
const { contentHeight, contentWidth } = useContentSize();
const { isHover } = useHover();
const { scrollDirection } = useScrollDirection();
const { barSize } = useBarSize();
const { thumbSize } = useThumbSize();
</script>
<template>
  <ul>
    <client-only>
      <li>
        <span>Scroll direction: </span>
        <span>{{ scrollDirection }}</span>
      </li>
      <li>
        <span>Status: </span>
        <span>{{ isHover ? "Hovering" : "Not hovering" }}</span>
      </li>
      <li>
        <span>Content position: </span>
        <span>{{ contentLeft }} x {{ contentTop }}</span>
      </li>
      <li>
        <span>Content size: </span>
        <span>{{ contentWidth }} x {{ contentHeight }}</span>
      </li>
      <li>
        <span>Bar size: </span>
        <span>{{ barSize }}</span>
      </li>
      <li>
        <span>Thumb size: </span>
        <span>{{ thumbSize }}</span>
      </li>
    </client-only>
  </ul>
</template>

<style scoped>
ul {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1em;
  margin: 0;
  list-style: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 12px;
  z-index: 1000;
  opacity: 0.5;
  letter-spacing: 0.5px;
}
</style>
