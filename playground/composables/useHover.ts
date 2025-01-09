const isHover = ref(false);
const setHover = (value: boolean) => {
  isHover.value = value;
};

export function useHover() {
    return {
        isHover,
        setHover,
    };
}
