<template>
  <div class="app-container">
    <StatusOverlay />
    <div class="scroll-container">
      <ScrollArea
        axis="both"
        :bar="{ size: 10, transparent: true }"
        :thumb="{ size: 4, rounded: true, color: 'white' }"
      >
        <img src="/bg.jpeg" alt="bg" />
      </ScrollArea>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.scroll-container {
  height: calc(100vh - 5rem);
  width: calc(100vw - 5rem);
  overflow: hidden;
}
</style>
