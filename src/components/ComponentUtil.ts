export function queryGuard<E extends Element>(callback: () => E | null) {
    const r = callback();
    if (r === null) {
        throw new Error('Element querying return null');
    }

    return r;
}

export function once<T>(callback: () => T) {
    let counter = 0;
    let cache: T;
    
    return function() {
        if (counter++ === 0) cache = callback();
        return cache;
    }
}
