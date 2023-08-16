export function getUniqueIdArr<T extends { id: string | number }>(arr: T[]): T[]{
  const ids = new Set();
  const res = [];

  for (const item of arr) {
    if (!ids.has(String(item.id))) {
      res.push(item);
      ids.add(String(item.id))      
    }
  }
  return res;
}
