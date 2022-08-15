import { useCallback, useRef } from 'react';

import { useEffectOnce } from './useEffectOnce';

export type IsMounted = () => boolean;

export const useIsMounted = (): IsMounted => {
    const ref = useRef(false);

    useEffectOnce(() => {
        ref.current = true;
        return () => {
            ref.current = false;
        };
    });

    return useCallback(() => ref.current, [ref]);
};
