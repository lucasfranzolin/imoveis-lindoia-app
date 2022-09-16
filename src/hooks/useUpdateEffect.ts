import { EffectCallback, useEffect, useRef } from 'react';

export const useUpdateEffect = (
    effect: EffectCallback,
    dependencyArray: any[]
) => {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyArray);
};
