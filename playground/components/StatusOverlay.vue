<script lang="ts" setup>
const {
  isHover,
  scrollDirection,
  barSize,
  barTransparent,
  thumbSize,
  thumbRound,
  contentClientHeight,
  contentClientWidth,
  contentScrollLeft,
  contentScrollTop,
  thumbYHeight,
  thumbYTop,
  thumbXWidth,
  thumbXLeft,
} = useScrollArea();
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
        <span>{{ contentScrollLeft }} x {{ contentScrollTop }}</span>
      </li>
      <li>
        <span>Content size: </span>
        <span>{{ contentClientWidth }} x {{ contentClientHeight }}</span>
      </li>
      <li>
        <span>Bar size: </span>
        <span>{{ barSize }}</span>
      </li>
      <li>
        <span>Bar transparent: </span>
        <span>{{ barTransparent ? "Yes" : "No" }}</span>
      </li>
      <li>
        <span>Thumb size: </span>
        <span>{{ thumbSize }}</span>
      </li>
      <li>
        <span>Thumb rounded: </span>
        <span>{{ thumbRound ? "Yes" : "No" }}</span>
      </li>
      <li>
        <span>thumb Y height: </span>
        <span>{{ thumbYHeight }}</span>
      </li>
      <li>
        <span>Thumb Y top: </span>
        <span>{{ thumbYTop }}</span>
      </li>
      <li>
        <span>Thumb X width: </span>
        <span>{{ thumbXWidth }}</span>
      </li>
      <li>
        <span>Thumb X left: </span>
        <span>{{ thumbXLeft }}</span>
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
