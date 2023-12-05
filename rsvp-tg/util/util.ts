export const asyncSome = async <T extends any>(
  arr: T[],
  predicate: (current: T) => Promise<boolean>
) => {
  for (let e of arr) {
    if (await predicate(e)) return true;
  }
  return false;
};
