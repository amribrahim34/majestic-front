/**
 * Formats a date string or Date object into a localized date string.
 * @param date - The date to format (string or Date object)
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns A formatted date string
 */
export function formatDate(date: string | Date, locale: string = 'en-US'): string {
  const dateObject = typeof date === 'string' ? new Date(date) : date

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObject)
}

/**
 * Formats a number or string representing currency into a localized currency string.
 * @param amount - The amount to format (number or string)
 * @param currency - The currency code to use (default: 'USD')
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns A formatted currency string
 */
export function formatCurrency(
  amount: number | string,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(numericAmount)
}
