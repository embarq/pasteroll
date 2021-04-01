export function isString (value: any): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function isFunction (value: any): value is Function {
  return typeof value === 'function'
}
