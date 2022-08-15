import { EffectCallback, useEffect, useRef } from 'react';

export function useUpdateEffect(
    effect: EffectCallback,
    dependencyArray: Array<any>
) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyArray);
}
