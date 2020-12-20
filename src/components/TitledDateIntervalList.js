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
          <div className="flex w-full items-center px-4">
            <div className="text-xs w-32 text-center">
              {isThisWeek(currentParsedDate, {weekStartsOn: 0})
                ? 'THIS WEEK'
                : format(currentParsedDate, 'MMMM yyyy')}
            </div>
            <hr className="border border-solid border-b-2 border-gray-400 w-full" />
          </div>
          {render({cardSet})}
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
