import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import CreateCardSetFormHeader from './CreateCardSetFormHeader'
import CardSetFields from './CardSetFields'

import {
  fetchPostCardSet,
  fetchPatchCardSetFlashcardCount,
} from '../fetchRequests/cardSets'
import {fetchPostUsersCardSet} from '../fetchRequests/usersCardSets'
import {
  fetchPostFlashCards,
  fetchPatchEditFlashcard,
} from '../fetchRequests/flashcards'

export default function CreateCardSetForm({
  editMode = false,
  cardSet,
  cardSetId,
  location = {},
}) {
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

  const handlePrivacy = React.useCallback(e => {
    setIsCardSetPrivate(e.target.value)
  }, [])

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.fromCustomize !== undefined
    ) {
      const {flashcardFields, cardSetName} = location.state
      setFields(flashcardFields)
      setCardSetName({
        name: 'card-set-name',
        value: cardSetName,
        isValid: true,
      })
    }
  }, [location])

  useEffect(() => {
    // Put this in a function
    if (editMode && cardSet) {
      let editCardSet
      if (cardSet.length !== 0) {
        editCardSet = cardSet.flashcards.map(flashcard => {
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
        cardSet.name
          ? {name: 'card-set-name', value: cardSet.name, isValid: true}
          : {},
      )
    }
  }, [editMode, cardSet, cardSetName.name])

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

  async function handleSave(event) {
    event.preventDefault()
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
      console.log(field.term.trim(), field.definition.trim())
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

    if (editMode) {
      // if no changes are made run this

      const ids = initialState.map(state => state.id)
      let newFlashcards = fields.filter(field => !ids.includes(field.id))

      await fetchPostFlashCards({
        fields: newFlashcards,
        card_set_id: cardSetId,
      })
      // check if field has a flashcard id that matches an initialState id
      // if it does not create a new flashcard and add this cardSet.id to this flashcard
      // if it does not run current try logic

      try {
        // if the ids match run this logic
        initialState.forEach(async field => {
          await fetchPatchEditFlashcard(field)
        })

        await fetchPatchCardSetFlashcardCount({
          id: cardSetId,
          flashcards_count: initialState.length,
        })

        alert('Updated!')

        history.push(`/card-sets/${cardSetId}`)
      } catch (e) {}
    } else {
      try {
        const cardSet = await fetchPostCardSet({
          name: cardSetName.value,
          flashcards_count: fields.length,
          isCardSetPrivate: isCardSetPrivate,
        })

        await fetchPostUsersCardSet({card_set_id: cardSet.id})
        await fetchPostFlashCards({fields, card_set_id: cardSet.id})

        alert('Saved!')

        history.push(`/card-sets/${cardSet.id}`)
      } catch (error) {}
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
        editMode={editMode}
      />
      <div className="bg-gray-300 my-2 mx-8">
        <CardSetFields
          handleRemove={handleRemove}
          handleChange={handleChange}
          fields={fields}
          setFields={setFields}
          handleSave={handleSave}
          editMode={editMode}
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
