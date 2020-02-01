import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import TextBox from '../components/TextBox'
import "../styles/index.css"
import { UserContext } from '../context/user-context'





export default function Navigation(props){

  let { user } = useContext(UserContext)
    const navRef = useRef(null)

    const [search, setSearch] = useState({name: '', value: '', isValid: true})
    const [expandSearchBar, setExpandSearchBar] =  useState(false)
    const [dropdownToggle, setDropdownToggle] =  useState(false)
    const [focused, setFocused] = useState(false)
    const [redirect, setRedirect] = useState(false)
  

    useEffect(() => {
      document.addEventListener('keydown', enterOnKeyPress)

      return function() {
        document.removeEventListener('keydown', enterOnKeyPress)
      }
    })

    function enterOnKeyPress(event) {
        if (focused &&  event.keyCode === 13) {
          setRedirect(true)
        } else {
          setRedirect(false)
        }
      }


    function renderSearch(){
      if (expandSearchBar) {
        return (
          <div className="flex w-full">
            <i className="text-2xl text-white self-center fas fa-search"></i>
            <div className="w-full">
              <TextBox
                className={`text-2xl outline-none w-full ml-3 bg-transparent placeholder-gray-500 mb-1 text-white h-full p-2 w-full placeholder border-solid`}
                placeholder="Search"
                type="text"
                name="search-box-nav"
                value={search.value}
                onFocus={() => setFocused(true)}
                onChange={setSearch}
                onBlur={() => {
                  setExpandSearchBar(false);
                  setFocused(false);
                  setSearch({ name: "", value: "", isValid: true });
                  setRedirect(false);
                }}
                ref={navRef}
              />
            </div>
            <i className=" self-center fas fa-times text-2xl text-white"></i>
            {redirect ? <Redirect push to={`/search/${search.value}`} /> : null}
          </div>
        );
      } else {
        return (
          <div className="flex">
            <div className="text-center flex justify-center h-full">
              <div className="h-full w-24 text-white flex justify-center search-box">
                <i className="h-full self-center h-full search-box mag-glass fas fa-search"></i>
                <div
                  onClick={handleExpandAndFocusSearchBar}
                  className="mx-2 search-box search"
                >
                  Search
                </div>
              </div>
            </div>
            {user ? <><div className="w-24">
              <div className="text-center">|</div>
            </div>
            <Link
              className="create-box flex justify-center w-24"
              to="/card-sets/new"
            >
              <i className="plus self-center fas fa-plus-square"></i>
              <div className="create text-center ml-3">
                Create
              </div>
            </Link></> : null}
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
            <a href="http://localhost:8000/auth/logout">
              LOGOUT
            </a>
          </div>
        )
      } 
      return
    }

    function renderUserOrOptions(){

        if (user) {
          return (
            <div
              className="flex search-box"
              onClick={
                () => {}
              }
            >
              <div
                className={`${
                  dropdownToggle ? "text-gray-500" : "text-white"
                } search-box search`}
              >
                {user && user.first_name}
              </div>
              <i
                onClick={() => setDropdownToggle(prev => !prev)}
                className={`${
                  dropdownToggle ? "text-gray-500" : "text-white"
                } search-box search pl-4 self-center fas fa-chevron-down`}
              ></i>
            </div>
          );
        } else {
           
           return <div className="flex text-white w-full justify-around h-full items-center">
                <Link
                  to="/login"
                >
                  <div>LOGIN</div>
                </Link>
                <div className="text-center">|</div>
                <Link
                  to="sign-up"
                >
                  <div>SIGN UP</div> 
                </Link>
          </div>
          
        }
    }

    

    function renderLogo(){
      return (
        <Link to="/">
          <div className="text-white text-4xl">Flashcards</div>
        </Link>
      );
    }


       return (
         <div className="w-full h-16 flex justify-between bg-teal-500 shadow px-6 items-center absolute">
           {/* LOGO * */}
           <div className={`flex justify-start h-full items-center ${expandSearchBar ? 'w-full' : 'w-3/4'}`}>
             <div>{renderLogo()}</div>
             <div className="ml-20 flex text-white items-center h-full w-full">
               {renderSearch()}
             </div>
           </div>
           {!expandSearchBar && <div className={`relative h-full flex items-center justify-center ${expandSearchBar ? 'w-full' : 
           'w-1/4' }`}>
             {renderUserOrOptions()}
             {renderDropdown()}
           </div>}
         </div>
       );
}

