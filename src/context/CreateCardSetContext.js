import React from 'react'
import { useLocation } from 'react-router-dom'

const CreateCardSetContext = React.createContext()
const { Provider } = CreateCardSetContext

const UPDATE_FIELDS = 'UPDATE_FIELDS'
const UPDATE_CARD_SET_NAME = 'UPDATE_CARD_SET_NAME'
const UPDATE_PRIVACY = 'UPDATE_PRIVACY'
const ADD_NEW_TERM_AND_DEFINITION = 'ADD_NEW_TERM_AND_DEFINITION'
const CLEAR_FIELDS = "CLEAR_FIELDS"

const cardSetFormReducerTypes = {
  UPDATE_FIELDS,
  UPDATE_CARD_SET_NAME,
  UPDATE_PRIVACY,
  ADD_NEW_TERM_AND_DEFINITION,
  CLEAR_FIELDS
}

function cardSetFormReducer(state, action){
  switch(action.type) {
    case ADD_NEW_TERM_AND_DEFINITION:
      return {...state, flashcardFields: [...state.flashcardFields, action.data]}
    case CLEAR_FIELDS: 
      return {...state, flashcardFields: initialFieldsState()}
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

let initialFieldsState = () => Array.from({length: 2}, () => ({term: '', definition: ''}))

function getInitialState(locationState, cardSet, editMode){
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
      isPrivate: cardSet.private,
      prevIsPrivate: cardSet.private
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
      initialFlashcardFields: cardSet.flashcards,
      flashcardFields: editCardSet,
      cardSetName: cardSet.name ? {name: 'card-set-name', value: cardSet.name, isValid: true} : {},
      cardSetId: cardSet.card_set_id,
      isPrivate: cardSet.private,
      prevIsPrivate: cardSet.private
    }
  } else {
    let fields = initialFieldsState()
    return {
      initialFlashcardFields: fields,
      flashcardFields: fields,
      cardSetName: {
        name: 'card-set-name',
        value: '',
        isValid: true
      },
      isPrivate: cardSet.private,
      prevIsPrivate: cardSet.private
    }
  }
}


function CreateCardSetProvider(props) {
  const location = useLocation()
  const [state, dispatch] = React.useReducer(cardSetFormReducer, {}, () => getInitialState(location.state, props.cardSet, props.editMode))

  return <Provider value={{state, dispatch}}>{props.children}</Provider>
}

function useCreateCardSet() {
    const context = React.useContext(CreateCardSetContext)
  
    if (!context) {
      throw new Error(`This hook can only be used by components that are children of a CreateCardSet Provider`)
    }
  
    return {...context, cardSetFormReducerTypes}
  }

  export { CreateCardSetProvider, useCreateCardSet }