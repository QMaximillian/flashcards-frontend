import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
// import { fetchRemoveCookie } from "../fetchRequests/user";
import TextBox from '../components/TextBox'
import "../styles/index.css"





export default function Navigation(props){
    const navRef = useRef(null)
    // const [ user, setUser ] = React.useState(props.user)
    const [search, setSearch] = useState({name: '', value: '', isValid: true})
    const [expandSearchBar, setExpandSearchBar] =  useState(false)
    const [dropdownToggle, setDropdownToggle] =  useState(false)

    function renderSearch(){
      if (expandSearchBar) {
        return (
          <div className="flex w-full">
            <i className="text-2xl text-white self-center fas fa-search"></i>
            <TextBox
              className={`text-2xl border-black border-b-2 outline-none w-full ml-3 bg-transparent placeholder-gray-500 mb-1 text-white h-full p-2 w-full placeholder border-solid`}
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
            <div className="text-center flex justify-center h-full">
              <div className="h-full w-24 text-white flex justify-center search-box">
                <i className="h-full self-center h-full search-box mag-glass text-white fas fa-search"></i>
                <div
                  onClick={handleExpandAndFocusSearchBar}
                  className="mx-2 search-box search"
                >
                  Search
                </div>
              </div>
            </div>
            <div className="w-24">
              <div className="text-center">|</div>
            </div>
            <Link to="/card-sets/new">
              <div className="text-center w-24">Create</div>
            </Link>
          </div>
        );
      }
      
    }

    const handleExpandAndFocusSearchBar = () => {
      setExpandSearchBar(true)
      setTimeout(function() {
                navRef.current.focus();
              }, 10);
    }

    function renderDropdown(){
      if (dropdownToggle) {
        return (
          <div className="pl-4 py-2 w-48 absolute h-56 border border-orange-500 right-0 top-0 mt-16 mr-16 z-10 bg-white shadow-lg">
            <div onClick={() => {
              // logout background
            }}>
              LOGOUT
            </div>
          </div>
        )
      } 
      return
    }

    function renderUserOrOptions(){
        if (props.user) {
          return (
            <div
              className="flex search-box"
              onClick={
                () => {}
                // () =>
                // fetchRemoveCookie(r => {
                //   // if (r.cookieDeleted) {
                //   //    setUser(null)
                //   // }
                // })
              }
            >
              <div className={`${dropdownToggle ? 'text-gray-500' : 'text-white'} search-box search`}>{props.user.first_name}</div>
              <i
                onClick={() => setDropdownToggle(prev => !prev)}
                className={`${dropdownToggle ? 'text-gray-500' : 'text-white'} search-box search pl-4 self-center fas fa-chevron-down`}
              ></i>
            </div>
          );
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
        <Link to="/home">
          <div className="text-white text-4xl">Flashy</div>
        </Link>
      );
    }
       return (
         <div className="w-full h-16 flex justify-between bg-teal-500 shadow px-6 items-center">
           {/* LOGO * */}
           <div className="flex justify-start h-full items-center w-3/4">
             <div>{renderLogo()}</div>
             <div className="ml-20 flex text-white items-center justify-between h-full">
               {renderSearch()}
             </div>
           </div>
           <div className="relative h-full flex items-center justify-center w-1/4">
             {renderUserOrOptions()}
             {renderDropdown()}
           </div>
         </div>
       );
}

