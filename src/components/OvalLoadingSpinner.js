import * as React from 'react'
import {Oval} from 'svg-loaders-react'

function OvalLoadingSpinner() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Oval width="100" height="100" stroke="teal" strokeOpacity="1" />
    </div>
  )
}

export default OvalLoadingSpinner
