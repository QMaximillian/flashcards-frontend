import React from 'react'
import UserInfoCard from "../components/UserInfoCard";
import UserCardSets from '../components/UserCardSets'
import { Switch, Route } from 'react-router-dom'

export default function UserCardSetsPage(props){

       return (
         <div className="w-full h-full bg-gray-200">
           <div className="w-full"></div>
           <div id="tabs">
             <Route path={`/:user`} component={UserInfoCard} />
             <Switch>
               <div className="w-3/4 p-6">
                 <Route
                   path="/:user/recent"
                   component={() => <div>Hello</div>}
                 />
                 <Route
                   path="/:user/studied"
                   component={() => <div>Studied</div>}
                 />
                 <Route path={`/:user`} component={UserCardSets} />
               </div>
             </Switch>
           </div>
         </div>
       );
}

