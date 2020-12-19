import React, {useContext, useReducer} from 'react'
import TextBox from './TextBox'
import {useHistory, useLocation} from 'react-router-dom'
import {FetchContext} from '../context/FetchContext'

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

const UPDATE_FIELDS = 'UPDATE_FIELDS'
const UPDATE_CARD_SET_NAME = 'UPDATE_CARD_SET_NAME'
const UPDATE_PRIVACY = 'UPDATE_PRIVACY'

function cardSetFormReducer(state, action) {
  switch (action.type) {
    case UPDATE_FIELDS:
      return {...state, flashcardFields: action.data}
    case UPDATE_CARD_SET_NAME:
      return {...state, cardSetName: action.data}
    case UPDATE_PRIVACY:
      return {...state, isPrivate: action.data}
    default:
      throw new Error(`Unsupported type: ${action.type}`)
  }
}

let initialFieldsState = () =>
  Array.from({length: 2}, () => ({term: '', definition: ''}))

function getInitialState(locationState, cardSet, editMode) {
  if (locationState !== undefined) {
    const {flashcardFields, prevCardSetName} = locationState
    return {
      initialFlashcardFields: flashcardFields,
      flashcardFields,
      cardSetName: {
        name: 'card-set-name',
        value: prevCardSetName,
        isValid: true,
      },
    }
  } else if (cardSet && editMode) {
    let editCardSet
    if (cardSet.length !== 0) {
      editCardSet = cardSet.flashcards.map(flashcard => ({
        id: flashcard.id,
        term: flashcard.term,
        definition: flashcard.definition,
      }))
    }

    return {
      initialFieldsState: editCardSet,
      flashcardFields: editCardSet,
      cardSetName: cardSet.name
        ? {name: 'card-set-name', value: cardSet.name, isValid: true}
        : {},
    }
  } else {
    let fields = initialFieldsState()
    return {
      initialFieldsState: fields,
      flashcardFields: fields,
      cardSetName: {
        name: 'card-set-name',
        value: '',
        isValid: true,
      },
    }
  }
}

export default function CreateCardSetForm(props) {
  const location = useLocation()
  let history = useHistory()

  const [state, dispatch] = useReducer(
    cardSetFormReducer,
    getInitialState(location.state, props.cardSet, props.editMode),
  )

  const {mainAxios} = useContext(FetchContext)

  function handleChange(i, event) {
    const {flashcardFields} = state
    const data = [...flashcardFields]

    if (event.name === `term-${i}`) {
      data[i].term = event.value
    }
    if (event.name === `definition-${i}`) {
      data[i].definition = event.value
    }

    dispatch({type: UPDATE_FIELDS, data})
  }

  function handleRemove(i) {
    const {flashcardFields} = state
    const data = [...flashcardFields]
    data.splice(i, 1)
    dispatch({type: UPDATE_FIELDS, data})
  }

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
      const {initialFields, flashcardFields} = state
      const ids = initialFields.map(state => state.id)
      let newFlashcards = flashcardFields.filter(
        field => !ids.includes(field.id),
      )

      await postFlashcards(mainAxios, {
        fields: newFlashcards,
        card_set_id: props.cardSetId,
      })

      for await (const field of initialFields) {
        await patchEditFlashcard(mainAxios, {field})
      }

      await patchCardSetFlashcardCount(mainAxios, {
        id: props.cardSetId,
        flashcards_count: initialFields.length,
      })

      alert('Updated!')
      history.push(`/card-sets/${props.cardSetId}`)
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
        flashcardFields,
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

  function clearFields() {
    dispatch({
      type: UPDATE_FIELDS,
      data: Array.from({length: 2}, () => ({term: '', definition: ''})),
    })
  }

  function updateCardSetName(event) {
    dispatch({
      type: 'UPDATE_CARD_SET_NAME',
      data: {...state.cardSetName, value: event.value},
    })
  }

  function updatePrivacy(event) {
    dispatch({type: UPDATE_PRIVACY, data: event.target.value})
  }

  function updateFields() {
    dispatch({
      type: 'UPDATE_FIELDS',
      data: [...state.flashcardFields, {term: '', definition: ''}],
    })
  }

  const {cardSetName, flashcardFields, isPrivate} = state
  return (
    <div className="col-start-1 col-end-13 row-start-1 row-end-13 flex w-full flex-col overflow-auto">
      <div className="p-4">
        <div className="mt-6 flex justify-between">
          <div className="text-3xl opacity-75 font-bold">
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
            error={{required: 'Must have a name for the card set'}}
            id="title"
            name="card-set-name"
            value={cardSetName.value}
            onChange={updateCardSetName}
            placeholder={'Subject, chapter, unit'}
            required={true}
            type="text"
            value={cardSetName.value}
          />
          <label className="text-xs opacity-50 mt-1" htmlFor="title">
            TITLE
          </label>
        </div>
        <div className="flex justify-between">
          <div>
            Accessible to:
            <select
              className="border border-black outline-none ml-2"
              onChange={event => setPrivacy(event.target.value)}
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
      <div className="bg-gray-300 my-4 mx-8">
        {flashcardFields.map((field, idx) => {
          return (
            <div className="w-full shadow-xl my-2 bg-white" key={index}>
              <div className="border-b border-gray-500 h-16 flex justify-between item-center">
                <div className="font-semibold self-center pr-2 text-lg h-164 pl-6 text-gray-500">
                  {index + 1}
                </div>
                <div
                  className="ml-2 self-center my-6 pr-4"
                  onClick={() => handleRemove(index)}
                >
                  X
                </div>
              </div>
              <div className="flex w-full pt-2 pb-8">
                <div
                  className="w-1/2 my-6 mr-6 pl-4"
                  key={`${field}-definition-${index}`}
                >
                  <TextBox
                    // required={true}
                    // error={{required: "Please enter corresponding answer"}}
                    name={`term-${index}`}
                    onChange={event => handleChange(event, index)}
                    placeholder="Enter term"
                    type="text"
                    value={field.term}
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
                    name={`definition-${index}`}
                    onChange={event => handleChange(event, index)}
                    placeholder="Enter definition"
                    type="text"
                    value={field.definition}
                  />
                  <label className="text-xs opacity-50 mt-1">DEFINITION</label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div
        className="shadow-lg bg-white mx-8 justify-center items-center flex h-24 "
        // onClick={() => setFields([...fields, {term: '', definition: ''}])}
        onClick={updateFields}
        // onClick={() => dispatch(
        //   { type: 'UPDATE_FIELDS', data: {...state.flashcardFields, {term: '', definition: ''}}}
        // )}
      >
        <div className="m-6 flex justify-center items-center add-card-div border-b-4 border-teal-500 h-10">
          <i className="fas fa-plus text-xs add-card-plus"></i>
          <div className="ml-2 text-base add-card-text">ADD CARD</div>
        </div>
      </div>
      <div className="flex justify-end mb-2">
        <div
          className="mt-4 mx-8 h-16 w-1/3 text-white bg-teal-500 flex justify-center items-center create-card-set-button"
          onClick={handleSave}
        >
          {props.editMode ? (
            <div className="create-text text-lg">Save</div>
          ) : (
            <div className="create-text text-lg">Create Set</div>
          )}
        </div>
      </div>
    </div>
  )
}
