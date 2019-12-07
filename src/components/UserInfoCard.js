import React, { useEffect } from 'react'
import { fetchShowUser } from '../fetchRequests/user'
import { Link, useParams, useRouteMatch } from 'react-router-dom'


export default function UserInfoCard(props){
  const { user: userParam } = useParams()
  const [profile, setProfile] = React.useState({})

    useEffect(() => {
      fetchShowUser(userParam)
        .then(r => setProfile(r));
    }, [userParam])

    const createdMatch = useRouteMatch('/:user')
    const recentMatch = useRouteMatch('/:user/recent')
    const studiedMatch = useRouteMatch('/:user/studied')
    
        if (profile) {
          return (
            <div className="flex">
              <div className="flex p-6">
                <div>
                  <img
                    className="w-32 h-32 rounded-full mr-4 bg-gray-500"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-around">
                  <div className="flex ml-4">
                    {renderUser()}
                    <div className="self-center ml-8 text-gray-500 font-light tracking-wide">{`${profile.first_name} ${profile.last_name}`}</div>
                  </div>
                  {renderMatch()}
                </div>
              </div>
            </div>
          );
        } else {
            return <div>Loading...</div>
        }

       function renderMatch() {
         return (
           <div className="flex ml-4">
             <Link to={`/${userParam}/recent`}>
               <div
                 className={`${
                   recentMatch
                     ? "bg-yellow-500 text-black"
                     : "hover:text-yellow-500 text-teal-300"
                 } border border-gray-500 py-2 px-4`}
               >
                 Recent
               </div>
             </Link>
             <Link to={`/${userParam}`}>
               <div
                 className={`${
                   createdMatch && !studiedMatch && !recentMatch
                     ? "bg-yellow-500 text-black"
                     : "hover:text-yellow-500 text-teal-300"
                 } border border-gray-500 py-2 px-4`}
               >
                 Created
               </div>
             </Link>
             <Link to={`/${userParam}/studied`}>
               <div
                 className={`${
                   studiedMatch
                     ? "bg-yellow-500 text-black"
                     : "hover:text-yellow-500 text-teal-300"
                 } border border-gray-500 py-2 px-4 `}
               >
                 Studied
               </div>
             </Link>
           </div>
         );
       }

       function renderUser(){
         return (
          <div className="text-4xl font-bold tracking-wide">
            {profile.username || profile.first_name}
          </div>
         )
       }
}




