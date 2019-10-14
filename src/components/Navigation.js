import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { fetchRemoveCookie } from "../fetchRequests/user";
import TextBox from '../components/TextBox'
import "../styles/index.css"





export default function Navigation(props){
    const navRef = useRef(null)
    // const [ user, setUser ] = React.useState(props.user)
    const [search, setSearch] = useState({name: '', value: '', isValid: true})
    const [expandSearchBar, setExpandSearchBar] =  useState(false)

    function renderSearch(){
      if (expandSearchBar) {
        return (
          <div className="flex w-full">
            <i className="text-white self-center fas fa-search"></i>
            <TextBox
              className={`w-full ml-3 bg-transparent placeholder-gray-500 mb-1 text-white h-full p-2 w-full placeholder border-black border-solid`}
              placeholder="Search"
              type="text"
              name="search-box-nav"
              value={search.value}
              onChange={setSearch}
              onFocus={() => console.log("focus")}
              onBlur={() => setExpandSearchBar(false)}
              ref={navRef}
            />
          </div>
        );
      } else {
        return (
          <div
            className="flex group text-white search-box"
            onClick={handleocus}
          >
            <i className="search-box search text-white group-hover:text-gray-500 self-center fas fa-search"></i>
            <div className="search-box mag-glass ml-3 text-white group-hover:text-gray-500">
              Search
            </div>
          </div>
        );
      }
      
    }

    const handleocus = () => {
      setExpandSearchBar(true)
      setTimeout(function() {
                navRef.current.focus();
              }, 10);
    }

    function renderUser(){
        if (props.user) {
          console.log('user')
            return (
              <div className="flex w-full">
                <div className="flex w-full">
                  <div className="mx-4">Flashy</div>
                  {/* <div className="mx-4">Search</div> */}
                  <div className="hover:text-gray-500 group border w-3/4 border-orange-500  flex justify-start items-center">
                    {renderSearch()}
                  </div>
                </div>
                {expandSearchBar ? null : <div className="flex justify-end w-full">
                  <div
                    onClick={() => {}
                      // () =>
                      // fetchRemoveCookie(r => {
                      //   // if (r.cookieDeleted) {
                      //   //    setUser(null)
                      //   // }
                      // })
                    }
                  >
                    {props.user.first_name}
                  </div>
                </div>}
              </div>
            );
        } else {
            return (
              <>
                <div className="w-1/4 h-full"></div>
                <div className="w-1/5 h-full">
                  <div className="whitespace-no-wrap">SIGN UP</div>
                  <Link
                    className="flex justify-between w-full h-full"
                    to="/login"
                  >
                    <div>LOGIN</div>
                  </Link>
                </div>
              </>
            );  
        }
    }
       return (
           <div className="w-full h-12 flex justify-between bg-teal-500 shadow">
             {renderUser()}
           </div>
       )
}

