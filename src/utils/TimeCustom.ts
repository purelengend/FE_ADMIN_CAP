export function convertTime(input: Date) {
  const result = input.setHours(input.getHours() + 7)
  return new Date(result)
}

export function displayDateTime(input: Date) {
  const displayDate = new Date(input)
  return new Intl.DateTimeFormat('en-US',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    .format(displayDate)
}