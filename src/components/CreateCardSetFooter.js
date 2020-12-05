import React, { useContext } from 'react'
import { useCreateCardSet } from '../context/CreateCardSetContext'
import { useHistory } from 'react-router-dom'
import { FetchContext } from '../context/FetchContext'

function postCardSet(httpClient, options = {}) {
  return httpClient.post('/card-sets', options)
}

function postUsersCardSet(httpClient, options = {}) {
  return httpClient.post('/users-card-set/new', options)
}

function postFlashcards(httpClient, options = {}) {
  return httpClient.post('/flashcards', options)
}

function patchEditFlashcard(httpClient, options = {}) {
  return httpClient.patch(`/flashcards/${options.field.id}`, options)
}

function patchCardSetFlashcardCount(httpClient, options = {}) {
  return httpClient.patch('/update-flashcard-count', options)
}

function patchCardSetPrivacy(httpClient, options = {}) {
  return httpClient.patch('/card-set', options) 
}

function CreateCardSetFooter(props){
    let history = useHistory()
    const {mainAxios} = useContext(FetchContext)
    const {state, dispatch, cardSetFormReducerTypes} = useCreateCardSet()

    function addField() {
        dispatch({
          type: cardSetFormReducerTypes.ADD_NEW_TERM_AND_DEFINITION,
          data: {term: '', definition: ''}
        })
      }

      function formValidation(){
        const { cardSetName, flashcardFields } = state
        // Card set name must be entered
        if (cardSetName.value === '') {
          return 'Must enter a card name'
        }
    
        // Must create at least two flashcards
        if (flashcardFields.length < 2) {
          return 'Please create at least 2 flashcards'
        }
    
        // Must make sure no two terms match
        const fieldTerms = flashcardFields.map(val => val.term)
        const uniqueFields = new Set(fieldTerms)
    
        if (uniqueFields.size !== fieldTerms.length) {
          return 'All terms must be unique'
        }
    
        for (let field of flashcardFields) {
          // A flashcard cannot be empty, it must be deleted or have both fields filled in
          if (field.term.trim() === '' && field.definition.trim() === '') {
            return 'Please delete or complete term and definition for all flashcards' 
          }
          // A flashcard must have a term and definition, not one without the other
          if (field.term.trim() === '' || field.definition.trim() === '') {
            return `Please complete flashcard term or definition in all rows`      
          }
        }
        // No form errors
        return false
      }
    
      async function editFlashcards(){
        try {
          const { flashcardFields, isPrivate, prevIsPrivate, cardSetId } = state
          
          const { oldFlashcards, newFlashcards } = flashcardFields.reduce((acc, curr) => {
            curr.id ? acc.oldFlashcards.push(curr) : acc.newFlashcards.push(curr)
            return acc
          }, {oldFlashcards: [], newFlashcards: []})
    
          const flashcardsPromise = postFlashcards(mainAxios, {
            fields: newFlashcards,
            card_set_id: cardSetId,
          })

          for await (const field of oldFlashcards) {
            await patchEditFlashcard(mainAxios, {field})
          }

          if (isPrivate !== prevIsPrivate) {
            await patchCardSetPrivacy(mainAxios, { isPrivate, id: cardSetId })
          }
    
          const cardSetFlashcardCountPromise = patchCardSetFlashcardCount(mainAxios, {
            id: cardSetId,
            flashcards_count: flashcardFields.length,
          })

          const [flashcardsResponse, cardSetFlashcardCountResponse] = await Promise.all([
            flashcardsPromise,
            cardSetFlashcardCountPromise
          ])

          if (flashcardsResponse.status !== 200) {
            // error handling
          }

          if (cardSetFlashcardCountResponse.status !== 200) {
            // error handling
          }
          
          alert('Updated!')
          history.push(`/card-sets/${state.cardSetId}`)
        } catch (error) {
          console.log('error: ', error.response)
        }
      }
    
      async function createCardSetAndFlashcards(){
    
        try {
          const { cardSetName, flashcardFields, isPrivate } = state
          const { data: { cardSetId }} = await postCardSet(mainAxios, {
            name: cardSetName.value,
            flashcards_count: flashcardFields.length,
            isPrivate,
          })
    
          // Save promises in variables
          const usersCardSetPromise = postUsersCardSet(mainAxios, {
            card_set_id: cardSetId,
          })
    
          const flashcardsPromise = postFlashcards(mainAxios, {
            fields: flashcardFields,
            card_set_id: cardSetId,
          })
    
          // Run promises in parallel
          const [userCardSetsResponse, flashcardsResponse] = await Promise.all([
            usersCardSetPromise,
            flashcardsPromise
          ])
          
          if (userCardSetsResponse.status !== "200") {
            // handle error
          }
    
          if (flashcardsResponse.status !== "200") {
            // handle error
          }
    
          alert('Saved!')
          history.push(`/card-sets/${cardSetId}`)
        } catch(error) {
          console.log('error response: ', error.response)
        }
      }

    async function handleSave() {
    // validation checks
      const invalidFormMessage = formValidation()

      if (invalidFormMessage) {
          return alert(invalidFormMessage)
      }

      if (props.editMode) {
          editFlashcards()
      } else {
          createCardSetAndFlashcards()
      }
    }

    return (
        <>
        <button
        className="shadow-lg bg-white mx-8 justify-center items-center flex h-24 "
        onClick={addField}
        data-testid="add-flashcard-fields"
      >
        <div className="m-6 flex justify-center items-center add-card-div border-b-4 border-teal-500 h-10">
          <i className="fas fa-plus text-xs add-card-plus"></i>
          <div className="ml-2 text-base add-card-text">ADD CARD</div>
        </div>
      </button>
      <div className="flex justify-end mb-2">
        <div
          onClick={handleSave}
          className="mt-4 mx-8 h-16 w-1/3 text-white bg-teal-500 flex justify-center items-center create-card-set-button"
        >
          {props.editMode ? (
            <button className="h-full w-full create-text text-lg" form="card-set-form">Save</button>
          ) : (
            <button className="h-full w-full create-text text-lg" form="card-set-form">Create Set</button>
          )}
        </div>
      </div>
      </>
    )
}

export default CreateCardSetFooter