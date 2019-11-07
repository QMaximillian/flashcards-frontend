import React from 'react'
import { isThisWeek, parseISO, getMonth, format } from "date-fns";
import UserCardSetCard from '../components/UserCardSetCard'

export function addTimeIntervals(array, Component, dynamicKey) {
  let withinWeekFlag = true;
  let month;
  let cutOffMonth;

  return array
    .map((cardSet, idx) => {
      if (isThisWeek(parseISO(cardSet[`${dynamicKey}`]))) {
        if (withinWeekFlag) {
          month = getMonth(parseISO(cardSet[`${dynamicKey}`]));
          cutOffMonth = month - 2;
          withinWeekFlag = false;

          return (
            <div key={idx} className="w-full flex flex-col">
              <div className="flex w-full items-center px-4">
                <div className="text-xs w-32">THIS WEEK</div>
                <hr className="border border-solid border-b-2 border-gray-400 w-full" />
              </div>
              <Component
                idx={idx}
                cardSet={cardSet}
                // handleChecked={handleChecked}
              />
            </div>
          );
        }

        if (!withinWeekFlag) {
          return (
            <Component
              key={idx}
              cardSet={cardSet}
              // handleChecked={handleChecked}
            />
          );
        }
      }

      if (month !== getMonth(parseISO(cardSet[`${dynamicKey}`]))) {
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
              // handleChecked={handleChecked}
            />
          </div>
        );
      }

      return (
        <UserCardSetCard
          key={idx}
          cardSet={cardSet}
          // handleChecked={handleChecked}
        />
      );
    });
}
