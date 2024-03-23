import { formatDistanceToNowStrict, intervalToDuration, sub } from 'date-fns'
import numeral from 'numeral'

// TODO: merge useFormatAccountId here
export default function () {
  const formatNumeral = (value, format = '0,0.00') => {
    const formattedNumber = numeral(value).format(format)
    if (isNaN(formattedNumber)) return value
    return formattedNumber
  }

  // ex 3 days ago
  const formatDateToDistance = (date) => {
    const duration = intervalToDuration({
      start: date,
      end: new Date(),
    })
    const subDate = sub(new Date(), duration)

    // TODO: add option locale
    const formatDateSplited = formatDistanceToNowStrict(subDate).split(' ')

    // TODO pb with chinese or other translation?
    return `${formatDateSplited[0]}${
      formatDateSplited[1] === 'month'
        ? 'M'
        : formatDateSplited[1].substring(0, 1)
    }`
  }

  return {
    formatNumeral,
    formatDateToDistance,
  }
}
