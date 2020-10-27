import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react'
import {Link, Redirect} from 'react-router-dom'
import TextBox from './TextBox'
import useClickOutside from '../lib/hooks/useClickOutside'
import {AuthContext} from '../context/AuthContext'
import '../styles/index.css'

function NavigationLogo() {
  return (
    <Link to="/">
      <div className="text-white text-4xl">Flashcards</div>
    </Link>
  )
}

const NavigationDropdown = React.forwardRef(({onClick}, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col justify-end ml-4 py-2 w-48 absolute h-18 border border-teal-500 right-0 top-0 mt-16 mr-16 z-10 bg-white shadow-lg text-md"
    >
      <div className="pl-4 ">
        <div onClick={onClick}>Log Out</div>
      </div>
    </div>
  )
})

function Navigation(props) {
  let {isAuthenticated, authState, logout} = useContext(AuthContext)
  const navRef = useRef(null)
  const wrapperRef = useRef(null)

  const [search, setSearch] = useState({name: '', value: '', isValid: true})
  const [expandSearchBar, setExpandSearchBar] = useState(false)
  const [dropdownToggle, setDropdownToggle] = useState(false)
  const [redirect, setRedirect] = useState(false)

  React.useLayoutEffect(() => {
    if (expandSearchBar) {
      navRef.current.focus()
    }
  }, [expandSearchBar])

  useClickOutside(wrapperRef, function() {
    if (!dropdownToggle) return
    setDropdownToggle(false)
  })

  const enterOnKeyPress = useCallback(event => {
    if (event.keyCode === 13) {
      setRedirect(true)
    } else {
      setRedirect(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', enterOnKeyPress)

    return function() {
      document.removeEventListener('keydown', enterOnKeyPress)
    }
  }, [enterOnKeyPress])

  function renderSearch() {
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
              onChange={setSearch}
              onBlur={() => {
                setExpandSearchBar(false)
                // navRef.current.focus()
                // setSearch({name: '', value: '', isValid: true})
                setRedirect(false)
              }}
              ref={navRef}
            />
          </div>
          <i className=" self-center fas fa-times text-2xl text-white"></i>
          {redirect ? <Redirect push to={`/search/${search.value}`} /> : null}
        </div>
      )
    } else {
      return (
        <div className="flex">
          <div className="text-center flex justify-center h-full">
            <div className="h-full w-24 text-white flex justify-center search-box">
              <i className="h-full self-center h-full search-box mag-glass fas fa-search"></i>
              <div
                onClick={() => setExpandSearchBar(true)}
                className="mx-2 search-box search"
              >
                Search
              </div>
            </div>
          </div>
          {isAuthenticated() ? (
            <>
              <div className="w-24">
                <div className="text-center">|</div>
              </div>
              <Link
                className="create-box flex justify-center w-24"
                to="/card-sets/new"
              >
                <i className="plus self-center fas fa-plus-square"></i>
                <div className="create text-center ml-3">Create</div>
              </Link>
            </>
          ) : null}
        </div>
      )
    }
  }

  function renderUserOrOptions() {
    if (isAuthenticated()) {
      return (
        <div
          className="flex search-box"
          onClick={() => setDropdownToggle(prev => !prev)}
        >
          <div
            className={`${
              dropdownToggle ? 'text-gray-500' : 'text-white'
            } search-box search`}
          >
            {authState.userInfo.first_name}
          </div>
          <i
            className={`${
              dropdownToggle ? 'text-gray-500' : 'text-white'
            } search-box search pl-4 self-center fas fa-chevron-down`}
          ></i>
        </div>
      )
    } else {
      return (
        <div className="flex text-white w-full justify-around h-full items-center">
          <Link to="/login">
            <div>LOGIN</div>
          </Link>
          <div className="text-center">|</div>
          <Link to="sign-up">
            <div>SIGN UP</div>
          </Link>
        </div>
      )
    }
  }

  return (
    <div className="h-full flex justify-between bg-teal-500 shadow items-center">
      <div
        className={`px-6 flex justify-start h-full items-center ${
          expandSearchBar ? 'w-full' : 'w-3/4'
        }`}
      >
        <NavigationLogo />
        <div className="ml-20 flex text-white items-center h-full w-full">
          {renderSearch()}
        </div>
      </div>
      {!expandSearchBar && (
        <div
          className={`relative h-full flex items-center justify-center ${
            expandSearchBar ? 'w-full' : 'w-1/4'
          }`}
        >
          {renderUserOrOptions()}
          {dropdownToggle && (
            <NavigationDropdown
              ref={wrapperRef}
              onClick={() => {
                setDropdownToggle(false)
                logout()
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Navigation
