// import React, {
//   // useEffect
// } from 'react'
// import FlashcardsNavDrawer from '../components/FlashcardNavDrawer'
// import MainNavDrawer from '../components/MainNavDrawer'

// export default function NavDrawer(props){
// console.log(props)
// const regex = new RegExp(/card-sets\/[\s\S]*/)
// const newCardSetRegex = new RegExp(/card-sets\/new/)

// if (newCardSetRegex.test(props.location.pathname)) {
//     return null
//   } else if (regex.test(props.location.pathname)) {
//     return (
//       <div className="w-2/5 h-full">
//         <FlashcardsNavDrawer />
//       </div>
//     );
//   } else {
//     return (
//       <div className="hidden lg:block pl-10 w-96 h-full">
//         <MainNavDrawer />
//       </div>
//     )
//   }
// }

import React from 'react' // useEffect
import {Route, Switch} from 'react-router-dom'

import MainNavDrawer from '../components/MainNavDrawer'

export default function NavDrawer(props) {
  return (
    <Switch>
      <Route exact path="/card-sets/new" component={null}></Route>
      <Route exact path="/card-sets/:id" component={null}></Route>
      <Route exact path="/card-sets/:id/edit" component={null}></Route>
      <Route exact path="/search/:search" component={null}></Route>
      <Route
        path="/"
        render={() => (
          <div className="w-2/5 sticky top-0" style={{height: '92vh'}}>
            <MainNavDrawer />
          </div>
        )}
      ></Route>
    </Switch>
  )
}
