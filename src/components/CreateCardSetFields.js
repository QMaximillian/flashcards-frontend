import React from 'react'
import { useCreateCardSet } from '../context/CreateCardSetContext'
import TextBox from './TextBox'

function CreateCardSetFields(props){

  const {state, dispatch, cardSetFormReducerTypes} = useCreateCardSet()

  function handleChange(i, event) {
    const { flashcardFields } = state
    const data = [...flashcardFields]

    if (event.name === `term-${i}`) {
      data[i].term = event.value
    }
    if (event.name === `definition-${i}`) {
      data[i].definition = event.value
    }

    dispatch({type: cardSetFormReducerTypes.UPDATE_FIELDS, data})
  }
  
  function handleRemove(i) {
    const { flashcardFields } = state
    const data = [...flashcardFields]
    data.splice(i, 1)
    dispatch({type: cardSetFormReducerTypes.UPDATE_FIELDS, data})
  }

  return state.flashcardFields.map((field, idx) => {
      return (
          <div key={idx} className="w-full shadow-xl my-2 bg-white">
      <div className="border-b border-gray-500 h-16 flex justify-between item-center">
        <div className="font-semibold self-center pr-2 text-lg h-164 pl-6 text-gray-500">
          {idx + 1}
        </div>
        <button
          className="ml-2 self-center my-6 pr-4"
          onClick={() => handleRemove(idx)}
        >
          X
        </button>
      </div>
      <div className="flex w-full pt-2 pb-8">
        <div
          className="w-1/2 my-6 mr-6 pl-4"
          key={`field-term-${idx}`}
        >
          <TextBox
            // required={true}
            // error={{required: "Please enter corresponding answer"}}
            placeholder="Enter term"
            onChange={(e) => handleChange(idx, e)}
            value={field.term}
            type="text"
            name={`term-${idx}`}
          />
          <label className="text-xs opacity-50 mt-1">TERM</label>
        </div>
        <div
          className="w-1/2 my-6 ml-6 pr-4"
          key={`field-answer-${idx}`}
        >
          <TextBox
            // required={true}
            // error={{required: "Please enter corresponding definition"}}
            placeholder="Enter definition"
            onChange={e => handleChange(idx, e)}
            value={field.definition}
            type="text"
            name={`definition-${idx}`}
          />
          <label className="text-xs opacity-50 mt-1">DEFINITION</label>
        </div>
      </div>
    </div>
    )
  })
}

export default CreateCardSetFields