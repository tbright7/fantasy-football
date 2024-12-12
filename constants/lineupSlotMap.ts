const startersLineupSlotIdMap = new Set([0, 1, 2, 3, 4, 6, 16, 17, 23]);

export const isStarting = (value: number) => startersLineupSlotIdMap.has(value);
