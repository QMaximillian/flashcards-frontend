import React from 'react'
import {useCreateCardSet} from '../context/CreateCardSetContext'

function CreateCardSetFooter() {
  const {
    state: {mode},
    dispatch,
    cardSetFormReducerTypes,
  } = useCreateCardSet()

  function addField() {
    dispatch({
      type: cardSetFormReducerTypes.ADD_NEW_TERM_AND_DEFINITION,
      data: {term: '', definition: ''},
    })
  }

  return (
    <>
      <button
        className="shadow-lg bg-white mx-8 justify-center items-center flex h-24 "
        onClick={addField}
        type="button"
      >
        <div className="m-6 flex justify-center items-center add-card-div border-b-4 border-teal-500 h-10">
          <i className="fas fa-plus text-xs add-card-plus"></i>
          <div className="ml-2 text-base add-card-text">ADD CARD</div>
        </div>
      </button>
      <div className="flex justify-end mb-2">
        <button
          className="mt-4 mx-8 h-16 w-1/3 text-white bg-teal-500 flex justify-center items-center create-card-set-button"
          type="submit"
        >
          {mode === 'EDIT' ? 'Save' : 'Create Set'}
        </button>
      </div>
    </>
  )
}

export default CreateCardSetFooter
