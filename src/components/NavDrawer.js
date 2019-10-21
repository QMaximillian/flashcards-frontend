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
      <div className="text-gray-700 font-semibold text-sm flex flex-col shadow-xl h-auto overflow-y-auto w-full justify-start">
        <div className="px-4 h-64 border border-gray-200 border-r-0 border-l-0">
          <Link to="/home">
            <div className="h-10 w-full items-center flex justify-start">
              <div>Home</div>
            </div>
          </Link>
        </div>
        <div className="px-4 h-64 border border-gray-200 border-r-0 border-l-0 flex flex-col justify-around">
          <Link to="/card-sets">
            <div className="h-10 w-full items-center flex justify-start">
              <div>Card Sets</div>
            </div>
          </Link>
          <Link to="#">
            <div className="h-10 w-full items-center flex justify-start">
              <div className="opacity-25 cursor-not-allowed">Folders</div>
            </div>
          </Link>
          <Link to="#">
            <div className="h-10 w-full items-center flex justify-start">
              <div className="opacity-25 cursor-not-allowed">Classes</div>
            </div>
          </Link>
        </div>
        <div className="px-4 h-64 border border-gray-200 border-r-0 border-l-0"></div>
      </div>
    );
  }
}

