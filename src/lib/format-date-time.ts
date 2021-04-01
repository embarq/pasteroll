const formatter = new Intl.DateTimeFormat([], {
  dateStyle: 'short',
  timeStyle: 'medium'
})

export function formatDateTime (value: Date | number | string): string {
  return formatter.format(new Date(value))
}
