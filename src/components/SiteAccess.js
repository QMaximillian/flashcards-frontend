import React, {useState} from 'react'
import TextBox from './TextBox'

export default function SiteAccess({setSiteAccess}) {
  const [text, setText] = useState({
    name: 'card-set-name',
    value: '',
    isValid: true,
  })

  return (
    <form className="bg-teal-500 h-screen w-screen bg-white shadow-lg rounded p-64 mb-4  max-w-6xl flex flex-col justify-center">
      <div>Enter Site Access Password</div>
      <div className="flex flex-wrap sm:flex-no-wrap  items-center justify-between">
        <TextBox
          id="site-access"
          required={true}
          // error={{required: 'Must have a name for the card set'}}
          name="site-access"
          value={text.value}
          onChange={setText}
          placeholder={'Input password to access site'}
          type="text"
        />
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.setItem(
              'siteAccess',
              process.env.REACT_APP_SITE_ACCESS_PASSWORD,
            )
            setSiteAccess(text.value)
          }}
        >
          Submit
        </button>
      </div>
    </form>
  )
}
