import React, { useEffect } from 'react'
import FlashcardsNavDrawer from '../components/FlashcardNavDrawer'
import MainNavDrawer from '../components/MainNavDrawer'

export default function NavDrawer(props){
useEffect(() => {
  console.log(props)
}, [props])

const regex = new RegExp(/card-sets\/[\s\S]*/)
const newCardSetRegex = new RegExp(/card-sets\/new/)

if (newCardSetRegex.test(props.location.pathname)) {
    return null
  } else if (regex.test(props.location.pathname)) {
    return (
      <div className="w-2/5 h-full">
        <FlashcardsNavDrawer />
      </div>
    );
  } else {
    return (
      <div className="w-2/5 h-full">
        <MainNavDrawer />
      </div>
    )
  }
}

