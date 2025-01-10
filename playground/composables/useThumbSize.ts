const thumbSize = ref(0);
const setThumbSize = (size: number) => {
    thumbSize.value = size;
};
export function useThumbSize() {
    return {
        thumbSize,
        setThumbSize,
    };
}