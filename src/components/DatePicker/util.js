import dayjs from 'dayjs'

export const initValue = (value, min, max) => {
  const newValue = value ? dayjs(value).toDate() : new Date()
  const isMin = min && dayjs(newValue).diff(min) < 0
  const isMax = max && dayjs(newValue).diff(max) > 0
  return isMin ? dayjs(min).toDate() : isMax ? dayjs(max).toDate() : newValue
}
