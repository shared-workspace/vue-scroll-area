const contentWidth = ref(0);
const contentHeight = ref(0);

const setContentSize = (width: number, height: number) => {
    if (0 < width) contentWidth.value = width;
    if (0 < height) contentHeight.value = height;
}

export function useContentSize(){
    return {
        contentWidth,
        contentHeight,
        setContentSize,
    }
}