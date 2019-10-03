import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FlashcardsNavDrawer from '../components/FlashcardNavDrawer'

export default function NavDrawer(props){
useEffect(() => {
  console.log(props)
}, [props])

const regex = new RegExp(/card-sets\/[\s\S]*/)


if (regex.test(props.location.pathname)) {
    return <FlashcardsNavDrawer />
  } else {
    return (
      <div className="flex flex-col shadow-lg h-full w-full justify-start">
        <Link to="/home">
          <div className="h-10 w-full border border-black items-center flex justify-center">
            <div>Home</div>
          </div>
        </Link>
        <Link to="/card-sets">
          <div className="h-10 w-full border border-black items-center flex justify-center">
            <div>Card Sets</div>
          </div>
        </Link>
      </div>
    );
  }
}

