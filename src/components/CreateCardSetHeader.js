import React from 'react'
import TextBox from './TextBox'
import { useCreateCardSet } from '../context/CreateCardSetContext'

export default function CreateCardSetHeader(props){

    const {state: { prevIsPrivate, isPrivate, cardSetName}, dispatch, cardSetFormReducerTypes } = useCreateCardSet()
  console.log('isPrivate', isPrivate)
  console.log('prevIsPrivate', prevIsPrivate)
    function clearFields() {
      dispatch(
        {type: cardSetFormReducerTypes.CLEAR_FIELDS, data: Array.from({length: 2}, () => ({term: '', definition: ''}))}
      )
    }

    function updatePrivacy(event){
      dispatch({type: cardSetFormReducerTypes.UPDATE_PRIVACY, data: event.target.value === 'true' ? true : false})
    }

    function updateCardSetName(event){
      dispatch({type: cardSetFormReducerTypes.UPDATE_CARD_SET_NAME, data: { ...cardSetName, value: event.value} })
    }

    return (
      <div className="bg-white p-4">
        <div className="mt-6 flex justify-between">
          <div className="text-3xl opacity-75 font-bold bg-white">
            Create a new study set
          </div>
          <div className="flex justify-end">
            <div
              className="m-2 p-2 bg-teal-500 text-white h-18  text-2xl self-center"
              onClick={clearFields}
            >
              ERASE ALL ENTRIES
            </div>
            {props.editMode ? (
              <div
                className="p-2 bg-teal-500 text-white h-18  text-2xl self-center"
                onClick={clearFields}
              >
                DELETE ALL
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full mt-12">
          <TextBox
            id="title"
            required={true}
            error={{required: 'Must have a name for the card set'}}
            name="card-set-name"
            value={cardSetName.value}
            onChange={updateCardSetName}
            placeholder={'Subject, chapter, unit'}
            type="text"
          />
          <label htmlFor="title" className="text-xs opacity-50 mt-1">
            TITLE
          </label>
        </div>
        <div className="flex justify-between">
          <div>
            Accessible to:
            <select
              className="border border-black outline-none ml-2"
              style={{textAlignLast: 'center'}}
              onChange={updatePrivacy}
              value={isPrivate}
            >
              <option value={true}>only you</option>
              <option value={false}>all</option>
            </select>
          </div>
        </div>
      </div>
    )
  }