import React from 'react'
import { isDate, isThisWeek, parseISO, getMonth, format } from "date-fns";

export function addTimeIntervals(array, Component, dynamicKey, props) {
// Checking if array passed in is an array
  if (!Array.isArray(array)) {
    throw new Error('First argument is not an array')
  }

  let isThisWeekFirstIdx = true;
  let month = getMonth(Date.now());
  let cutOffMonth = month - 4;

  return array
    .map((cardSet, idx) => {

      // Error checking dynamicKey can be converted into a date
      if (!isDate(parseISO(dynamicKey))) {
        throw new Error("dynamicKey is not a date or can't be converted to a date")
      }


      if (isThisWeek(parseISO(cardSet[`${dynamicKey}`]), { weekStartsOn: 0 })) {
        if (isThisWeekFirstIdx) {
          // Check if the first value in our array is within the
          // first week. 
          isThisWeekFirstIdx = false;

          // We only want to show the 'THIS WEEK' header once, 
          // so set isThisWeekFirstIdx to false to prevent showing it 
          // for each entry that is within this week
          
          return (
            <div key={idx} className="w-full flex flex-col">
              <div className="flex w-full items-center px-4">
                <div className="text-xs w-32">THIS WEEK</div>
                <hr className="border border-solid border-b-2 border-gray-400 w-full" />
              </div>
              <Component idx={idx} cardSet={cardSet} {...props} />
            </div>
          );
        } else {
          // return base component after the 'THIS WEEK' header is generated for the first and only time
          return <Component key={idx} cardSet={cardSet} {...props} />;
        }
      }

      if (month === getMonth(parseISO(cardSet[`${dynamicKey}`]))) {
        // If the month matches the current cardSet keys month then create a new header with that specific month
        // Subtract to generate previous months header when the conditional is fulfilled 
        month = month - 1;

        return (
          <div key={idx} className="w-full flex flex-col">
            <div className="flex w-full items-center px-4">
              <div className="text-xs w-32 text-center">
                {getMonth(parseISO(cardSet[`${dynamicKey}`])) < cutOffMonth
                  ? "Prior"
                  : format(parseISO(cardSet[`${dynamicKey}`]), "MMMM yyyy")}
              </div>
              <hr className="border border-solid border-b-2 border-gray-400 w-full" />
            </div>
            <Component
              cardSet={cardSet}
              {...props}
            />
          </div>
        );
      }
    
      // If none of these conditions are met, return base component
      return (
        <Component
          key={idx}
          cardSet={cardSet}
          {...props}
        />
      );
    });
}

export const uuidCheck = new RegExp(
  /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}/
);