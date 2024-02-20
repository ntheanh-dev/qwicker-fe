import { useState, useEffect } from 'react';
function useDebounce(value, deplay) {
    const [DebounceValue, setUseDebounceValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setUseDebounceValue(value), deplay);
        return () => {
            clearTimeout(timer);
        };
    }, [value, deplay]);
    return DebounceValue;
}
export default useDebounce;