import React from 'react'
import {isThisWeek, parseISO, getMonth, format} from 'date-fns'

export default function TitledDateIntervalList({
  dateKey,
  data,
  Component,
  options = {},
}) {
  let currentMonth,
    previousMonth = getMonth(parseISO(data.slice(0, 1)[dateKey]))

  return data.map((cardSet, index) => {
    const currentParsedDate = parseISO(cardSet[dateKey])
    currentMonth = getMonth(currentParsedDate)

    if (currentMonth !== previousMonth) {
      previousMonth = currentMonth
      return (
        <div key={index} className="w-full flex flex-col">
          <div className="flex w-full items-center px-4">
            <div className="text-xs w-32 text-center">
              {isThisWeek(currentParsedDate, {weekStartsOn: 0})
                ? 'THIS WEEK'
                : format(currentParsedDate, 'MMMM yyyy')}
            </div>
            <hr className="border border-solid border-b-2 border-gray-400 w-full" />
          </div>
          <Component cardSet={cardSet} {...options} />
        </div>
      )
    }

    return (
      <Component key={index} cardSet={cardSet} {...options} index={index} />
    )
  })
}
