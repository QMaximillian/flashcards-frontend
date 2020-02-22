import React from 'react'

function LoggedOutHome(props) {
  return (
    <div className="flex flex-grow">
      <div className=" flex justify-content align-items flex-grow">
        <div
          className="flex-1 h-full flex items-center flex-col"
          style={{justifyContent: 'space-evenly'}}
        >
          <div>Create</div>
          <img className="max-w-md border border-black w-3/4 h-64" />
          <div className="text-center">
            Lorem ipsum quiquit dolor asndsndsdsakd asdasdksa dasd saddsdaasd
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: '33%',
            top: '20%',
            bottom: '15%',
            bordeLeft: '1px solid black',
          }}
        />
        <div
          className="flex-1 h-full flex items-center flex-col"
          style={{justifyContent: 'space-evenly'}}
        >
          <div>Find</div>
          <img className="max-w-md border border-black w-3/4 h-64" />
          <div className="text-center">
            Lorem ipsum quiquit dolor asndsndsdsakd asdasdksa dasd saddsdaasd
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: '66%',
            top: '20%',
            bottom: '15%',
            borderLeft: '1px solid black',
          }}
        />
        <div
          className="flex-1 h-full flex items-center flex-col"
          style={{justifyContent: 'space-evenly'}}
        >
          <div>Study</div>
          <img className="max-w-md border border-black w-3/4 h-64" />
          <div className="text-center">
            Lorem ipsum quiquit dolor asndsndsdsakd asdasdksa dasd saddsdaasd
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoggedOutHome
