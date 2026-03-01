type DateVariant = 'month-year' | 'month-short-year' | 'full'

export function useFormatDate() {
  const { locale } = useI18n()

  function formatDate(date: string | Date, variant: DateVariant = 'full'): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const loc = locale.value === 'ru' ? 'ru-RU' : 'en-US'

    switch (variant) {
      case 'month-year':
        return d.toLocaleDateString(loc, { month: 'long', year: 'numeric' })
      case 'month-short-year':
        return d.toLocaleDateString(loc, { month: 'short', year: 'numeric' })
      case 'full':
        return d.toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' })
    }
  }

  return { formatDate }
}
