import React from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'

const CreateCardSetContext = React.createContext()
const {Provider} = CreateCardSetContext

function CreateCardSetProvider({children, cardSet, mode}) {
  const location = useLocation()
  const [state, dispatch] = React.useReducer(cardSetFormReducer, {}, () =>
    getInitialState(location.state, cardSet, mode),
  )

  return <Provider value={{state, dispatch}}>{children}</Provider>
}

function useCreateCardSet() {
  const context = React.useContext(CreateCardSetContext)

  if (!context) {
    throw new Error(
      `This hook can only be used by components that are children of a CreateCardSet Provider`,
    )
  }

  return {...context, cardSetFormReducerTypes}
}

// Functions for setting the initialState of the reducer
let initialFieldsState = () =>
  Array.from({length: 2}, () => ({term: '', definition: ''}))

function getInitialState(locationState, cardSet, mode = 'CREATE') {
  if (locationState !== undefined) {
    const {flashcardFields, prevCardSetName, mode} = locationState

    return {
      flashcardFields,
      cardSetName: {
        name: 'card-set-name',
        value: prevCardSetName,
        isValid: true,
      },
      isPrivate: false,
      prevIsPrivate: false,
      mode,
    }
  } else if (cardSet && mode === 'EDIT') {
    return {
      flashcardFields: cardSet.flashcards,
      cardSetName: cardSet.name
        ? {name: 'card-set-name', value: cardSet.name, isValid: true}
        : {},
      cardSetId: cardSet.card_set_id,
      isPrivate: cardSet.private,
      prevIsPrivate: cardSet.private,
      mode,
    }
  } else if (mode === 'CREATE') {
    let flashcardFields = initialFieldsState()
    return {
      flashcardFields,
      cardSetName: {
        name: 'card-set-name',
        value: '',
        isValid: true,
      },
      isPrivate: false,
      prevIsPrivate: false,
      mode,
    }
  }
}

// Constants for action types in cardSetFormReducer
const UPDATE_FIELDS = 'UPDATE_FIELDS'
const UPDATE_CARD_SET_NAME = 'UPDATE_CARD_SET_NAME'
const UPDATE_PRIVACY = 'UPDATE_PRIVACY'
const ADD_NEW_TERM_AND_DEFINITION = 'ADD_NEW_TERM_AND_DEFINITION'
const CLEAR_FIELDS = 'CLEAR_FIELDS'

const cardSetFormReducerTypes = {
  UPDATE_FIELDS,
  UPDATE_CARD_SET_NAME,
  UPDATE_PRIVACY,
  ADD_NEW_TERM_AND_DEFINITION,
  CLEAR_FIELDS,
}

function cardSetFormReducer(state, action) {
  switch (action.type) {
    case ADD_NEW_TERM_AND_DEFINITION:
      return {
        ...state,
        flashcardFields: [...state.flashcardFields, action.data],
      }
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

CreateCardSetContext.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.element]).isRequired,
  mode: PropTypes.oneOf(['CUSTOMIZE', 'EDIT', 'CREATE']),
  cardSet: PropTypes.shape({
    name: PropTypes.string,
    card_set_id: PropTypes.string,
    creator_id: PropTypes.string,
    creator_username: PropTypes.string,
    flashcards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        term: PropTypes.string,
        definition: PropTypes.string,
      }),
    ),
  }),
}

export {CreateCardSetProvider, useCreateCardSet}
