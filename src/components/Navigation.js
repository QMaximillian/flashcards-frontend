import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRemoveCookie } from "../fetchRequests/user";
import TextBox from '../components/TextBox'






export default function Navigation(props){

    // const [ user, setUser ] = React.useState(props.user)
    const [search, setSearch] = useState({name: '', value: '', isValid: true})
    const [expandSearchBar, setExpandSearchBar] =  useState(false)
    
    function renderSearch(){
      if (expandSearchBar) {
        return (
          // Expanded search bar
          // When not focused, setExpandSearchBar(false)
          <div className="w-full">
            <TextBox
              placeholder="Search"
              type="text"
              name="search-box-nav"
              value={search.value}
              onChange={setSearch}
            />
            </div>
        );
      } else {
        return (
         // Button 
         <div onClick={() => setExpandSearchBar(true)}>
           Search
         </div>
        )
      }
      
    }
    function renderUser(){
        if (props.user) {
          console.log('user')
            return (
              <div className="flex w-full">
                <div className="flex w-full">
                  <div className="mx-4">{props.user.first_name}</div>
                  {/* <div className="mx-4">Search</div> */}
                  <div className="group border w-3/4 border-orange-500  flex justify-start items-center">
                    <i className="group-hover:text-gray-500 text-white self-center fas fa-search"></i>
                    {renderSearch()}
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <div
                    onClick={() =>
                      fetchRemoveCookie(r => {
                        // if (r.cookieDeleted) {
                        //    setUser(null)
                        // }
                      })
                    }
                  >
                    LOGOUT
                  </div>
                </div>
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

