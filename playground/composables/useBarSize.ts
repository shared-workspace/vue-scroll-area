const barSize = ref(0);
const setBarSize = (size: number) => {
    barSize.value = size;
};
export function useBarSize() {
    return {
        barSize,
        setBarSize,
    };
}