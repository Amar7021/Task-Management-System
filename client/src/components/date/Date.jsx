import "./date.scss"

const TodaysDate = () => {
  const currentDate = new Date()

  const getFormattedDate = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]

    const date = currentDate.getDate()
    const month = months[currentDate.getMonth()]
    const year = currentDate.getFullYear()
    const dayOfWeek = days[currentDate.getDay()]

    return `Today - ${date} ${month} ${year} - ${dayOfWeek}`
  }

  return (
    <div className="date">
      <p className="formatted-date">{getFormattedDate()}</p>
    </div>
  )
}

export default TodaysDate
