import type { CSSProperties } from "vue";

const barSize = ref(0);
const setBarSize = (size: number) => { barSize.value = size };

const barTransparent = ref(false);
const setBarTransparent = (transparent: boolean) => { barTransparent.value = transparent };

const thumbSize = ref(0);
const setThumbSize = (size: number) => { thumbSize.value = size };

const thumbRound = ref(false);
const setThumbRound = (round: boolean) => { thumbRound.value = round };

const thumbColor = ref("rgba(0, 0, 0, 0.5)") as Ref<CSSProperties["color"]>;
const setThumbColor = (color: CSSProperties["color"]) => { thumbColor.value = color };

const isHover = ref(false);
const setHover = (value: boolean) => { isHover.value = value };

const scrollDirection = ref("none") as Ref<"none" | "y" | "x" | "both">;
const setScrollDirection = (value: "none" | "y" | "x" | "both") => { scrollDirection.value = value };
const isAxisX = computed(() => scrollDirection.value === "x" || scrollDirection.value === "both");
const isAxisY = computed(() => scrollDirection.value === "y" || scrollDirection.value === "both");

const contentClientHeight = ref(1);
const contentClientWidth = ref(1);
const setContentClientSize = (width: number, height: number) => {
  if (0 < width) contentClientWidth.value = isAxisY.value ? width - barSize.value : width;
  if (0 < height) contentClientHeight.value = isAxisX.value ? height - barSize.value : height;
};

const contentScrollWidth = ref(1);
const contentScrollHeight = ref(1);
const setContentScrollSize = (width: number, height: number) => { 
  if (0 < width) contentScrollWidth.value = width;
  if (0 < height) contentScrollHeight.value = height;
};

const contentScrollTop = ref(1);
const contentScrollLeft = ref(1);
const setContentScrollPosition = (left: number, top: number) => {
  if (0 < left) contentScrollLeft.value = left;
  if (0 < top) contentScrollTop.value = top;
};

const thumbYHeight = computed(() => ((contentClientHeight.value / contentScrollHeight.value) * contentClientHeight.value));
const thumbYTop = computed(() => (contentScrollTop.value / contentScrollHeight.value) * contentClientHeight.value);
const showBarY = computed(() => 1 < thumbYHeight.value && isAxisY.value);


const thumbXWidth = computed(() => ((contentClientWidth.value / contentScrollWidth.value) * contentClientWidth.value));
const thumbXLeft = computed(() => (contentScrollLeft.value / contentScrollWidth.value) * contentClientWidth.value);
const showBarX = computed(() => 1 < thumbYHeight.value && isAxisX.value);

export function useScrollArea() {
  return {
    barSize,
    setBarSize,
    barTransparent,
    setBarTransparent,
    thumbSize,
    setThumbSize,
    thumbRound,
    setThumbRound,
    thumbColor,
    setThumbColor,
    isHover,
    setHover,
    scrollDirection,
    setScrollDirection,
    isAxisX,
    isAxisY,
    contentClientHeight,
    contentClientWidth,
    setContentClientSize,
    contentScrollWidth,
    contentScrollHeight,
    setContentScrollSize,
    contentScrollTop,
    contentScrollLeft,
    setContentScrollPosition,
    thumbYHeight,
    thumbYTop,
    showBarY,
    thumbXWidth,
    thumbXLeft,
    showBarX,
  };
}
