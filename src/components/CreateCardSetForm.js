import React, {useState, useEffect, useContext} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {FetchContext} from '../context/FetchContext'
import CreateCardSetFormHeader from './CreateCardSetFormHeader'
import CardSetFields from './CardSetFields'

export default function CreateCardSetForm(props) {
  const {mainAxios} = useContext(FetchContext)
  const [initialState, setInitialState] = useState(
    Array.from({length: 2}, () => ({term: '', definition: ''})),
  )

  const [fields, setFields] = useState(initialState)
  const [cardSetName, setCardSetName] = useState({
    name: 'card-set-name',
    value: '',
    isValid: true,
  })

  const [isCardSetPrivate, setIsCardSetPrivate] = useState(true)
  let history = useHistory()
  let location = useLocation()

  const handlePrivacy = React.useCallback(e => {
    setIsCardSetPrivate(e.target.value)
  }, [])

  useEffect(() => {
    if (location?.state?.fromCustomize !== undefined) {
      console.log('fired')
      const {flashcardFields, prevCardSetName} = location.state
      setFields(flashcardFields)
      setCardSetName({
        name: 'card-set-name',
        value: prevCardSetName,
        isValid: true,
      })
    }
  }, [location])

  useEffect(() => {
    // Put this in a function
    if (props.editMode && props.cardSet.flashcards) {
      let editCardSet
      if (props.cardSet.length !== 0) {
        editCardSet = props.cardSet.flashcards.map(flashcard => {
          return {
            id: flashcard.id,
            term: flashcard.term,
            definition: flashcard.definition,
          }
        })
      }

      setFields(editCardSet || [])
      setInitialState(editCardSet)
      setCardSetName(
        props.cardSet.name
          ? {name: 'card-set-name', value: props.cardSet.name, isValid: true}
          : {},
      )
    }
  }, [props.editMode, props.cardSet, cardSetName.name])

  function handleChange(i, event) {
    const values = [...fields]

    if (event.name === `term-${i}`) {
      values[i].term = event.value
    }
    if (event.name === `definition-${i}`) {
      values[i].definition = event.value
    }

    setFields(values)
  }

  function handleRemove(i) {
    const values = [...fields]
    values.splice(i, 1)
    setFields(values)
  }

  async function handleSave() {
    // validation checks
    if (cardSetName.value === '') {
      alert('Must enter a card name')
      return
    }

    // If both fields are not filled out, remove item from fields array

    if (fields.length < 2) {
      alert('Please create at least 2 flashcards')
      return
    }

    for (let field of fields) {
      if (field.term.trim() === '' && field.definition.trim() === '') {
        alert(
          'Please delete or complete term and definition for all flashcards',
        )
        return
      }

      if (field.term.trim() === '' || field.definition.trim() === '') {
        alert(`Please complete flashcard term or definition in all rows`)
        return
      }
    }

    // ----------------------------------------------------------------------

    if (props.editMode) {
      // if no changes are made run this
      try {
        const ids = initialState.map(state => state.id)
        let newFlashcards = fields.filter(field => !ids.includes(field.id))

        function postFlashcards() {
          mainAxios.post('/flashcards', {
            fields: newFlashcards,
            card_set_id: props.cardSetId,
          })
        }

        function patchEditFlashcard(field) {
          mainAxios.patch(`/flashcards/${field.id}`, {field})
        }

        await postFlashcards()

        // TODO:

        // check if field has a flashcard id that matches an initialState id
        // if it does not create a new flashcard and add this cardSet.id to this flashcard
        // if it does not run current try logic

        // if the ids match run this logic
        initialState.forEach(field => {
          patchEditFlashcard(field)
        })

        function patchCardSetFlashcardCount() {
          mainAxios.patch('/update-flashcard-count', {
            id: props.cardSetId,
            flashcards_count: initialState.length,
          })
        }

        // FIX THIS -------------------------------------------------------

        // Doesn't save when creating a new flashcard and saving
        // Saves after you do that and then save again
        await patchCardSetFlashcardCount()
        alert('Updated!')
        history.push(`/card-sets/${props.cardSetId}`)
      } catch (error) {
        console.log('error: ', error)
      }
    } else {
      try {
        function postCardSet() {
          return mainAxios.post('/card-sets', {
            name: cardSetName.value,
            flashcards_count: fields.length,
            isPrivate: isCardSetPrivate,
          })
        }

        function postUsersCardSet(cardSetId) {
          return mainAxios.post('/users-card-set/new', {
            card_set_id: cardSetId,
          })
        }

        function postFlashcards(cardSetId) {
          return mainAxios.post('/flashcards', {
            fields,
            card_set_id: cardSetId,
          })
        }

        const res = await postCardSet()
        const cardSetId = res.data.cardSetId
        await postUsersCardSet(cardSetId)
        await postFlashcards(cardSetId)
        alert('Saved!')
        history.push(`/card-sets/${cardSetId}`)
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }

  return (
    <div className="col-start-1 col-end-13 row-start-1 row-end-13 flex w-full flex-col bg-gray-300 overflow-auto">
      <CreateCardSetFormHeader
        handleReset={() => {
          setFields([
            {term: '', definition: ''},
            {term: '', definition: ''},
          ])
        }}
        cardSetNameValue={cardSetName.value}
        setCardSetName={setCardSetName}
        isCardSetPrivate={isCardSetPrivate}
        handlePrivacy={handlePrivacy}
        editMode={props.editMode}
      />
      <div className="bg-gray-300 my-2 mx-8">
        <CardSetFields
          handleRemove={handleRemove}
          handleChange={handleChange}
          fields={fields}
          setFields={setFields}
          handleSave={handleSave}
          editMode={props.editMode}
        />
      </div>
    </div>
  )
}

CreateCardSetForm.propTypes = {
  editMode: PropTypes.bool.isRequired,
  cardSet: PropTypes.shape({
    card_set_id: PropTypes.string.isRequired,
    creator_id: PropTypes.string.isRequired,
    creator_username: PropTypes.string.isRequired,
    flashcards: PropTypes.arrayOf(
      PropTypes.shape({
        definition: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        term: PropTypes.string.isRequired,
      }),
    ),
    name: PropTypes.string.isRequired,
  }),
}
