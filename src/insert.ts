interface PropertyEntry<T> {
  before: string;
  property: string;
  value: T;
}

/**
 * Inserts a property before another in an object literal without breaking references to it
 *
 * @param target the target record
 * @param entry the entry info with property, value and before which property has to go
 */
export function insert<T = unknown>(target: Record<string, T>, entry: PropertyEntry<T>): void {
  const temp = {} as Record<string, T>;
  const { before, property, value } = entry;
  let found = false;

  for (const p in target) {
    if (p === before) {
      found = true;
    }

    if (found) {
      temp[p] = target[p];
      delete target[p];
    }
  }

  Object.assign(target, { [property]: value, ...temp });
}
