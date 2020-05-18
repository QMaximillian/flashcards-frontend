import React from 'react'
import TextBox from './TextBox'

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
    <header className="p-8 pt-2">
      <div className="mt-6 flex justify-between">
        <p className="text-3xl opacity-75 font-bold self-center ">
          Create A Card Set
        </p>
        <div className="flex justify-end">
          <button
            className="m-2 p-2 bg-teal-500 text-white h-18  text-2xl self-center"
            onClick={handleReset}
          >
            ERASE ALL ENTRIES
          </button>
          {/* <div
              onClick={handleSave}
              className="p-2 ml-2 bg-teal-500 text-white h-18  text-2xl self-center"
            >
              CREATE SET
            </div> */}

          {editMode ? (
            <button
              className="p-2 bg-teal-500 text-white h-18 text-2xl self-center"
              onClick={handleReset}
            >
              DELETE ALL
            </button>
          ) : null}
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
