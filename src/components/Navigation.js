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
          <div className="flex">
            <div className="text-center flex justify-center h-full border border-blue-700">
              <div className="h-full w-24 text-white flex justify-center search-box">
                <i className="h-full self-center h-full search-box mag-glass text-white fas fa-search"></i>
                <div className="mx-2 search-box search">Search</div>
              </div>
            </div>
            <div className="w-24 border border-blue-700">
              <div className="text-center">|</div>
            </div>
            <div className="text-center w-24 border border-blue-700">
              Create
            </div>
          </div>
        );
      }
      
    }

    const handleFocusSearchBar = () => {
      setExpandSearchBar(true)
      setTimeout(function() {
                navRef.current.focus();
              }, 10);
    }

    function renderUserOrOptions(){
        if (props.user) {
          return (
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
          )
        } else {
            return (
                <div className="flex">
                  <div className="whitespace-no-wrap">SIGN UP</div>
                  <Link
                    className="flex justify-between w-full h-full"
                    to="/login"
                  >
                    <div>LOGIN</div>
                  </Link>
                  <Link
                    className="flex justify-between w-full h-full"
                    to="sign-up"
                  >
                    <div>SIGN UP</div>
                  </Link>
                </div>
            );  
        }
    }

    

    function renderLogo(){
      return (
        <div>Flashy</div>
      )
    }
       return (
         <div className="w-full h-16 flex justify-between bg-teal-500 shadow px-6 items-center">
           {/* LOGO * */}
           <div className="flex justify-start h-full items-center border border-orange-500 w-3/4">
             <div>{renderLogo()}</div>
             <div
               className="ml-20 flex text-white items-center justify-between border border-red-500 h-full"
               onClick={handleFocusSearchBar}
             >
               {renderSearch()}
             </div>
           </div>
           <div className="h-full flex items-center justify-center border border-orange-500 w-1/4">
             {renderUserOrOptions()}
           </div>
         </div>
       );
}

