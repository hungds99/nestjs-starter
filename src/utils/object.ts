export function excludeKey<T, Key extends keyof T>(
  data: T | T[],
  keys: Key[],
): Omit<T, Key> {
  if (Array.isArray(data)) {
    return data.map((o) => excludeKey(o, keys)) as unknown as Omit<T, Key>;
  }

  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>;
}
