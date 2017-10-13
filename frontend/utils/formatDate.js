export function formatDate (date) {

  if (Object.prototype.toString.call(date) != '[object Date]') {
    date = new Date(date)
  }
  let day = date.getDate()
  let month = date.getMonth()
  const year = date.getFullYear()

  day = ('00' + day).slice(-2)
  month = ('00' + month).slice(-2)

  return `${day}/${month}/${year}`

}

export function formatDateTime (date) {

  if (Object.prototype.toString.call(date) != '[object Date]') {
    date = new Date(date)
  }
  let day = date.getDate()
  let month = date.getMonth()
  const year = date.getFullYear()

  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  hours = ('00' + hours).slice(-2)
  minutes = ('00' + minutes).slice(-2)
  seconds = ('00' + seconds).slice(-2)

  day = ('00' + day).slice(-2)
  month = ('00' + month).slice(-2)

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

}

export function formatDateTimeAmPm(date) {

  if (Object.prototype.toString.call(date) != '[object Date]') {
    date = new Date(date)
  }
  let day = date.getDate()
  let month = date.getMonth()
  const year = date.getFullYear()

  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12

  hours = ('00' + hours).slice(-2)
  minutes = ('00' + minutes).slice(-2)
  seconds = ('00' + seconds).slice(-2)

  day = ('00' + day).slice(-2)
  month = ('00' + month).slice(-2)

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`

}
