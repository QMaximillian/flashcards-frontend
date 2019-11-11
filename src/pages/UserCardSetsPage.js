import React, { useState } from 'react'
import UserInfoCard from "../components/UserInfoCard";
import UserCardSets from '../components/UserCardSets'
import HomeLatest from '../components/HomeLatest'
import StudiedCardSetsContainer from '../components/StudiedCardSetsContainer'
import TextBox from '../components/TextBox'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

export default function UserCardSetsPage(props){

  const [filter, setFilter] = useState("Latest");
  const [search, setSearch] = useState({ name: "", value: "", isValid: true });

  
  const recentMatch = useRouteMatch('/:user/recent')
  const createdMatch = useRouteMatch('/:user/')
  const studiedMatch = useRouteMatch('/:user/studied')

  function renderSelect() {
    if (recentMatch) return 
    if (studiedMatch) return
    return (
      <>
      <div className="self-center text-xs">SORT</div>
      <select
        className="ml-4 h-12 w-32 border-gray-500 border rounded-none text-teal-500"
        // style={{ textAlignLast: "left" }}
        onChange={e => setFilter(e.target.value)}
        value={filter}
      >
        <option className="h-12 w-32" value="Latest">
          Latest
        </option>
        <option className="h-12 w-32" value="Alphabetical">
          Alphabetical
        </option>
      </select>
      </>
    );
  }

  function renderSearch(){
    if (!studiedMatch) {
      return (
      <div className="w-full">
        <TextBox
        name="search-bar"
        type="text"
        value={search.value}
        onChange={setSearch}
        placeholder={renderPlaceholder()}
        className={`outline-none bg-gray-200 mb-1 text-black h-full p-2 w-full placeholder placeholder-gray-400 border-b-2 border-black border-solid`}
      />
      </div>
      )
    }
  }

  function renderPlaceholder() {
    if (recentMatch) {
      return 'Search your sets by title'
    } else if (createdMatch) {
      return 'Type to filter'
    }
  }
       return (
         <div className="w-full h-full bg-gray-200">
           <div className="w-full"></div>
           <div id="tabs">
             <Route path={`/:user`} component={UserInfoCard} />
             <div className="w-3/4 p-6">
               <div className="border border-black w-full">
                 {/* <div onClick={() => setEditMode(!editMode)}>
             EDIT MODE: {editMode ? "On" : "Off"}
           </div> */}
                 <div className="flex w-full justify-between p-4">
                   <div className="w-full flex text-sm justify-start ml-2">
                     {renderSelect()}
                   </div>
                   {renderSearch()}
                 </div>
                 <div>
                   <Switch>
                     <Route
                       path="/:user/recent"
                       render={() => (
                         <HomeLatest limit={10} pageType="RECENT" search={search} />
                       )}
                     />
                     <Route
                       path="/:user/studied"
                       render={() => <StudiedCardSetsContainer />}
                     />
                     <Route
                       path={`/:user`}
                       render={() => (
                         <UserCardSets search={search} filter={filter} />
                       )}
                     />
                   </Switch>
                 </div>
               </div>
             </div>
           </div>
         </div>
       );
}

