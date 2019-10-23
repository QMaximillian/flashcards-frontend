import React, { useEffect } from 'react'
import FlashcardsNavDrawer from '../components/FlashcardNavDrawer'
import MainNavDrawer from '../components/MainNavDrawer'

export default function NavDrawer(props){
useEffect(() => {
  console.log(props)
}, [props])

const regex = new RegExp(/card-sets\/[\s\S]*/)


if (regex.test(props.location.pathname)) {
    return <FlashcardsNavDrawer />
  } else {
    return <MainNavDrawer />
  }
}

