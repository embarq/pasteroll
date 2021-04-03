export function isString (value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction (value: unknown): value is Function {
  return typeof value === 'function'
}
