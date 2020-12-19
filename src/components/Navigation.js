import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useLayoutEffect,
} from 'react'
import {Link, Redirect} from 'react-router-dom'
import TextBox from './TextBox'
import useClickOutside from '../lib/hooks/useClickOutside'
import {AuthContext} from '../context/AuthContext'

function NavigationLogo() {
  return (
    <Link to="/">
      <p className="text-white text-4xl">
Flashcards
</p>
    </Link>
  )
}

const NavigationDropdown = React.forwardRef(({onClick}, ref) => {
  return (
    <div
      className=" w-32 absolute h-12 border border-teal-500 right-0 top-0 mt-16 mr-16 z-10 bg-white  shadow-lg text-md"
      ref={ref}
    >
      <ul className="flex flex-col justify-center items-center h-full w-full">
        <li className="text-center w-full hover:bg-red-500"
onClick={onClick}>
          Log Out
        </li>
      </ul>
    </div>
  )
})

function Navigation() {
  let {isAuthenticated, authState, logout} = useContext(AuthContext)
  const navRef = useRef(null)
  const wrapperRef = useRef(null)

  const [search, setSearch] = useState({name: '', value: '', isValid: true})
  const [expandSearchBar, setExpandSearchBar] = useState(false)
  const [dropdownToggle, setDropdownToggle] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useLayoutEffect(() => {
    if (expandSearchBar) {
      navRef.current.focus()
    }
  }, [expandSearchBar])

  useClickOutside(wrapperRef, function() {
    if (!dropdownToggle) return
    setDropdownToggle(false)
  })

  const enterOnKeyPress = useCallback(
    event => setRedirect(event.keyCode === 13),
    [],
  )

  useEffect(() => {
    document.addEventListener('keydown', enterOnKeyPress)

    return function cleanup() {
      document.removeEventListener('keydown', enterOnKeyPress)
    }
  }, [enterOnKeyPress])

  function renderSearch() {
    if (expandSearchBar) {
      return (
        <span className="flex w-full">
          {redirect ? <Redirect push
to={`/search/${search.value}`} /> : null}
          <i className="text-2xl text-white self-center fas fa-search"></i>
          <form className="w-full"
onSubmit={event => event.preventDefault()}>
            <TextBox
              className={`text-2xl outline-none ml-3 bg-transparent placeholder-gray-500 mb-1 text-white h-full p-2 w-full placeholder border-solid`}
              name="search-box-nav"
              onBlur={() => {
                setExpandSearchBar(false)
                setRedirect(false)
                setSearch(prevSearch => ({...prevSearch, value: ''}))
              }}
              onChange={setSearch}
              placeholder="Search"
              ref={navRef}
              type="text"
              value={search.value}
            />
          </form>
          <i className=" self-center fas fa-times text-2xl text-white"></i>
        </span>
      )
    } else {
      return (
        <div className="flex">
          <span className="h-full w-24 text-white flex justify-center search-box">
            <i className="h-full self-center search-box mag-glass fas fa-search"></i>
            <p
              className="mx-2 search-box search"
              onClick={() => setExpandSearchBar(true)}
            >
              Search
            </p>
          </span>
          {isAuthenticated() && (
            <>
              <span className="w-24">
                <div className="text-center">
|
</div>
              </span>
              <span>
                <Link
                  className="create-box flex justify-center w-24"
                  to="/card-sets/new"
                >
                  <i className="plus self-center fas fa-plus-square" />
                  <p className="create text-center ml-3">
Create
</p>
                </Link>
              </span>
            </>
          )}
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
          <p
            className={`${
              dropdownToggle ? 'text-gray-500' : 'text-white'
            } search-box search`}
          >
            {authState.userInfo.first_name}
          </p>
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
          <span>
            <Link to="/login">
              <p>
LOGIN
</p>
            </Link>
          </span>
          <span className="text-center">
|
</span>
          <span>
            <Link to="sign-up">
              <p>
SIGN UP
</p>
            </Link>
          </span>
        </div>
      )
    }
  }

  return (
    <nav className="h-full flex justify-between bg-teal-500 shadow items-center">
      <span
        className={`px-6 flex justify-start h-full items-center ${
          expandSearchBar ? 'w-full' : 'w-3/4'
        }`}
      >
        <NavigationLogo />
        <span className="ml-20 flex text-white items-center h-full w-full">
          {renderSearch()}
        </span>
      </span>
      {!expandSearchBar && (
        <span
          className={`relative h-full flex items-center justify-center w-1/4`}
        >
          {renderUserOrOptions()}
          {dropdownToggle && (
            <NavigationDropdown
              onClick={() => {
                setDropdownToggle(false)
                logout()
              }}
              ref={wrapperRef}
            />
          )}
        </span>
      )}
    </nav>
  )
}

export default Navigation
