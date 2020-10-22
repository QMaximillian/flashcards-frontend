import React from 'react'
import TextBox from './TextBox'
import Button from './Button'

export default function CreateCardSetFormHeader({
  handleReset,
  cardSetNameValue,
  setCardSetName,
  editMode = false,
  handlePrivacy,
  isCardSetPrivate,
}) {
  // WHEN IN EDIT MODE SHOULD THERE BE AN OPTION TO REVERT BACK TO THE INITIAL EDIT MODE STATE?
  return (
    <header className="p-8 pt-2 mx-8">
      <div className="mt-6 flex justify-between">
        <p className="text-3xl opacity-75 font-bold self-center w-full">
          Create A Card Set
        </p>
        <div className="w-1/3 h-16">
          <Button
            className="bg-white hover:bg-red-500 "
            buttonText={'Erase All'}
            onClick={handleReset}
            type="button"
          />
        </div>
      </div>

      <div className="w-full mt-6">
        <label htmlFor="title" className="text-xs opacity-50 mt-4">
          TITLE
        </label>
        <TextBox
          id="title"
          required={true}
          error={{required: 'Must have a name for the card set'}}
          name="card-set-name"
          value={cardSetNameValue}
          onChange={setCardSetName}
          placeholder={'Subject, chapter, unit'}
          type="text"
          className="bg-transparent"
          // Change TextBox component to set new classname styles after its original styles
        />
      </div>

      <div className="mt-4">
        Accessible to:
        <select
          className="border border-black outline-none ml-2"
          style={{textAlignLast: 'center'}}
          onChange={handlePrivacy}
          value={isCardSetPrivate}
        >
          <option value={true}>only you</option>
          <option value={false}>all</option>
        </select>
      </div>
    </header>
  )
}
