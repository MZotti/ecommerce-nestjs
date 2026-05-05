const mergeData = (prev: any[], incoming: any[]) => {
    const map = new Map();

    prev.forEach(p => map.set(p.id, p));
    incoming.forEach(p => map.set(p.id, p));

    return Array.from(map.values());
}

export {
    mergeData
}