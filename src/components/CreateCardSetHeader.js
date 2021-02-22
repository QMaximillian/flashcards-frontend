import React from 'react'
import TextBox from './TextBox'
import {useCreateCardSet} from '../context/CreateCardSetContext'

function CreateCardSetHeader() {
  const {
    state: {isPrivate, cardSetName},
    dispatch,
    cardSetFormReducerTypes,
  } = useCreateCardSet()

  function clearFields() {
    dispatch({
      type: cardSetFormReducerTypes.CLEAR_FIELDS,
      data: Array.from({length: 2}, () => ({term: '', definition: ''})),
    })
  }

  function updatePrivacy(event) {
    dispatch({
      type: cardSetFormReducerTypes.UPDATE_PRIVACY,
      data: event.target.value === 'true' ? true : false,
    })
  }

  function updateCardSetName(event) {
    dispatch({
      type: cardSetFormReducerTypes.UPDATE_CARD_SET_NAME,
      data: {...cardSetName, value: event.value},
    })
  }

  return (
    <div className="bg-white p-4">
      <div className="mt-6 flex justify-between">
        <div className="text-3xl opacity-75 font-bold bg-white">
          Create a new study set
        </div>
        <div className="flex justify-end">
          <button
            className="m-2 p-2 bg-teal-500 text-white h-18  text-2xl self-center"
            onClick={clearFields}
            type="button"
          >
            ERASE ALL ENTRIES
          </button>
        </div>
        <div className="flex justify-start">
          <label htmlFor="select-privacy">Accessible to:</label>
          <select
            className="border border-black outline-none ml-2"
            style={{textAlignLast: 'center'}}
            onChange={updatePrivacy}
            value={isPrivate}
            id="select-privacy"
            data-testid="select-privacy"
          >
            <option value={true}>only you</option>
            <option value={false}>all</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default CreateCardSetHeader
