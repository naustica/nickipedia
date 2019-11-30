const convertTime = (data: { timestamp: any }[]): any => {
  for (var i=0; i<data.length; i++) {
    let currentDate:any = new Date()
    let date:any = new Date(data[i].timestamp)

    const difference = Math.abs(date.getTime() - currentDate.getTime())
    const differenceInSeconds = Math.floor(difference / (1000))
    const differenceInMinutes = Math.floor(difference / (1000 * 60))
    const differenceInHours = Math.floor(difference / (1000 * 3600))
    const differenceInDays = Math.floor(difference / (1000 * 3600 * 24))
    const differenceInWeeks = Math.floor(difference / (1000 * 3600 * 24 * 7))
    const differenceInMonths = Math.floor(difference / (1000 * 3600 * 24 * 7 * 4))
    const differenceInYears = Math.floor(difference / (1000 * 3600 * 24 * 7 * 4 * 12))

    switch (true) {
      case differenceInSeconds < 2:
        data[i].timestamp = '1 second ago'
        break
      case differenceInSeconds < 60:
        data[i].timestamp = differenceInSeconds + ' seconds ago'
        break
      case differenceInMinutes < 2:
        data[i].timestamp = differenceInMinutes + ' minute ago'
        break
      case differenceInMinutes < 60:
        data[i].timestamp = differenceInMinutes + ' minutes ago'
        break
      case differenceInHours < 2:
        data[i].timestamp = differenceInHours + ' hour ago'
        break
      case differenceInHours < 24:
        data[i].timestamp = differenceInHours + ' hours ago'
        break
      case differenceInDays < 2:
        data[i].timestamp = differenceInDays + ' day ago'
        break
      case differenceInDays < 30:
        data[i].timestamp = differenceInDays + ' days ago'
        break
      case differenceInWeeks < 2:
        data[i].timestamp = differenceInWeeks + ' week ago'
        break
      case differenceInWeeks < 30:
        data[i].timestamp = differenceInWeeks + ' weeks ago'
        break
      case differenceInMonths < 2:
        data[i].timestamp = differenceInMonths + ' month ago'
        break
      case differenceInMonths < 12:
        data[i].timestamp = differenceInMonths + ' months ago'
        break
      case differenceInYears < 2:
        data[i].timestamp = differenceInYears + ' year ago'
        break
      case differenceInYears > 1:
        data[i].timestamp = differenceInYears + ' years ago'
        break
      }
    }
}

export default convertTime

// convert play time from video

export const convertPlayTime = (time: number): string => {
  let minutes: any = Math.floor(time / 60)
  var seconds: any = time - minutes * 60
  seconds = Math.floor(Math.ceil(seconds * 100) / 100)
  if (seconds < 10) {
    seconds = String(0) + String(seconds)
  }
  if (minutes < 10) {
    minutes = String(0) + String(minutes)
  }
  return String(minutes + ':' + seconds)
}

// convert duration time for suggestion cards

export const convertDurationTime = (duration: string): string | null => {
  try {
    let durationSplit = duration.split(':')
    let seconds = durationSplit[2]
    let minutes = durationSplit[1]
    return minutes + ':' + seconds
  }
  catch (error) {
    return null
  }
}
