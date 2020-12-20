import React from 'react'
import {useCreateCardSet} from '../context/CreateCardSetContext'
import TextBox from './TextBox'

function CreateCardSetFields() {
  const {state, dispatch, cardSetFormReducerTypes} = useCreateCardSet()

  function handleChange(index, event) {
    const {flashcardFields} = state
    const data = [...flashcardFields]

    if (event.name === `term-${index}`) {
      data[index].term = event.value
    }
    if (event.name === `definition-${index}`) {
      data[index].definition = event.value
    }

    dispatch({type: cardSetFormReducerTypes.UPDATE_FIELDS, data})
  }

  function handleRemove(index) {
    const {flashcardFields} = state
    const data = [...flashcardFields]
    data.splice(index, 1)
    dispatch({type: cardSetFormReducerTypes.UPDATE_FIELDS, data})
  }

  return state.flashcardFields.map((field, index) => {
    return (
      <div key={index} className="w-full shadow-xl my-2 bg-white">
        <div className="border-b border-gray-500 h-16 flex justify-between item-center">
          <div className="font-semibold self-center pr-2 text-lg h-164 pl-6 text-gray-500">
            {index + 1}
          </div>
          <button
            className="text-center mr-2 px-4"
            onClick={() => handleRemove(index)}
            type="button"
          >
            X
          </button>
        </div>
        <div className="flex w-full pt-2 pb-8">
          <div
            className="w-1/2 my-6 mr-6 pl-4"
            key={`${field}-definition-${index}`}
          >
            <TextBox
              // required={true}
              // error={{required: "Please enter corresponding answer"}}
              placeholder="Enter term"
              onChange={e => handleChange(index, e)}
              value={field.term}
              type="text"
              name={`term-${index}`}
            />
            <label className="text-xs opacity-50 mt-1">TERM</label>
          </div>
          <div
            className="w-1/2 my-6 ml-6 pr-4"
            key={`${field}-answer-${index}`}
          >
            <TextBox
              // required={true}
              // error={{required: "Please enter corresponding definition"}}
              placeholder="Enter definition"
              onChange={e => handleChange(index, e)}
              value={field.definition}
              type="text"
              name={`definition-${index}`}
            />
            <label className="text-xs opacity-50 mt-1">DEFINITION</label>
          </div>
        </div>
      </div>
    )
  })
}

export default CreateCardSetFields
