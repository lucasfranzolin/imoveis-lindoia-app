import { useCallback, useEffect, useState } from 'react';

import { useIsMounted } from './useIsMounted';

export const useSessionStorage = (key: string, initialValue: string) => {
    const isMounted = useIsMounted();

    const [storageValue, setStorageValue] = useState(() => {
        if (!isMounted()) return initialValue;
        const storedValue = window.sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        if (storageValue === undefined)
            return window.sessionStorage.removeItem(key);

        if (isMounted())
            window.sessionStorage.setItem(key, JSON.stringify(storageValue));
    }, [isMounted, key, storageValue]);

    const remove = useCallback(() => setStorageValue(undefined), []);

    return [storageValue, setStorageValue, remove];
};
