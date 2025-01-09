const contentLeft = ref(0);
const contentTop = ref(0);

const setContentPosition = (left: number, top: number) => {
    if (0 < left) contentLeft.value = left;
    if (0 < top) contentTop.value = top;
}

export function useContentPosition(){
    return {
        contentLeft,
        contentTop,
        setContentPosition,
    }
}