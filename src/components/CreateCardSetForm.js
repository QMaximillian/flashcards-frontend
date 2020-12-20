import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {FetchContext} from '../context/FetchContext'
import CreateCardSetHeader from './CreateCardSetHeader'
import CreateCardSetFields from './CreateCardSetFields'
import CreateCardSetFooter from './CreateCardSetFooter'
import PropTypes from 'prop-types'
import {useCreateCardSet} from '../context/CreateCardSetContext'

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

function CreateCardSetForm() {
  let history = useHistory()
  const {mainAxios} = useContext(FetchContext)
  const {state} = useCreateCardSet()

  function formValidation() {
    const {cardSetName, flashcardFields} = state
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
      // A flashcard must have a term and definition, not one without the other
      if (field.term.trim() === '' && field.definition.trim() === '') {
        return 'Please delete or complete term and definition for all flashcards'
      }
      // A flashcard cannot be empty, it must be deleted or have both fields filled in
      if (field.term.trim() === '' || field.definition.trim() === '') {
        return `Please complete flashcard term or definition in all rows`
      }
    }
    // No form errors
    return false
  }

  async function editFlashcards() {
    try {
      const {flashcardFields, isPrivate, prevIsPrivate, cardSetId} = state

      const {oldFlashcards, newFlashcards} = flashcardFields.reduce(
        (acc, curr) => {
          curr.id ? acc.oldFlashcards.push(curr) : acc.newFlashcards.push(curr)
          return acc
        },
        {oldFlashcards: [], newFlashcards: []},
      )

      const flashcardsPromise = postFlashcards(mainAxios, {
        fields: newFlashcards,
        card_set_id: cardSetId,
      })

      for await (const field of oldFlashcards) {
        await patchEditFlashcard(mainAxios, {field})
      }

      if (isPrivate !== prevIsPrivate) {
        await patchCardSetPrivacy(mainAxios, {isPrivate, id: cardSetId})
      }

      const cardSetFlashcardCountPromise = patchCardSetFlashcardCount(
        mainAxios,
        {
          id: cardSetId,
          flashcards_count: flashcardFields.length,
        },
      )

      const [
        flashcardsResponse,
        cardSetFlashcardCountResponse,
      ] = await Promise.all([flashcardsPromise, cardSetFlashcardCountPromise])

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

  async function createCardSetAndFlashcards() {
    try {
      const {cardSetName, flashcardFields, isPrivate} = state
      const {
        data: {cardSetId},
      } = await postCardSet(mainAxios, {
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
        flashcardsPromise,
      ])

      if (userCardSetsResponse.status !== '200') {
        // handle error
      }

      if (flashcardsResponse.status !== '200') {
        // handle error
      }

      alert('Saved!')
      history.push(`/card-sets/${cardSetId}`)
    } catch (error) {
      console.log('error response: ', error.response)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const {mode} = state
    // validation checks
    const invalidFormMessage = formValidation()

    if (invalidFormMessage) {
      return alert(invalidFormMessage)
    }

    if (mode === 'EDIT') {
      editFlashcards()
    } else {
      createCardSetAndFlashcards()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="card-set-form"
      className="col-start-1 col-end-13 row-start-1 row-end-13 flex w-full flex-col bg-gray-300 overflow-auto"
    >
      <CreateCardSetHeader />
      <div className="bg-gray-300 my-4 mx-8">
        <CreateCardSetFields />
      </div>
      <CreateCardSetFooter />
    </form>
  )
}

export default CreateCardSetForm
