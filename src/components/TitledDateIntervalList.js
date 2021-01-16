import React from 'react'
import {isThisWeek, parseISO, getMonth, format} from 'date-fns'
import PropTypes from 'prop-types'

function TitledDateIntervalList({dateKey, data, render}) {
  let currentMonth,
    previousMonth = getMonth(parseISO(data.slice(0, 1)[dateKey]))

  return data.map((cardSet, index) => {
    const currentParsedDate = parseISO(cardSet[dateKey])
    currentMonth = getMonth(currentParsedDate)

    if (currentMonth !== previousMonth) {
      previousMonth = currentMonth
      return (
        <div className="w-full flex flex-col" key={index}>
          <div className="flex items-center mx-4 mt-3 mb-1 border-b-4 border-teal-400">
            <div className="text-2xl w-auto font-light ml-2 text-gray-700 ">
              {isThisWeek(currentParsedDate, {weekStartsOn: 0})
                ? 'This Week'
                : format(currentParsedDate, 'MMMM yyyy')}
            </div>
          </div>
          {render({cardSet, index})}
        </div>
      )
    }

    return render({cardSet, key: index, index})
  })
}

TitledDateIntervalList.propTypes = {
  dateKey: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
}

export default TitledDateIntervalList
