import type { CSSProperties } from "vue";

const scrollDirection = ref('none') as Ref<'none' | 'y' | 'x' | 'both'>;

const setScrollDirection = (value: 'none' | 'y' | 'x' | 'both') => {
  scrollDirection.value = value;
};

export function useScrollDirection() {
    return {
        scrollDirection,
        setScrollDirection,
        overflowDirection: computed((): CSSProperties => {
          switch (scrollDirection.value) {
            case 'none':
              return {
                overflowX: 'hidden',
                overflowY: 'hidden',
              }
            case 'y':
              return {
                overflowX: 'hidden',
                overflowY: 'scroll',
              }
            case 'x':
              return {
                overflowX: 'scroll',
                overflowY: 'hidden',
              }
            case 'both':
              return {
                overflowX: 'scroll',
                overflowY: 'scroll',
              }
          }
          return {
            overflowX: 'hidden',
            overflowY: 'hidden',
          };
        }), // Implement this
    };
}