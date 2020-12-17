import React, {useState, useEffect, useContext} from 'react'
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

  const [isPrivate, setPrivacy] = useState(true)
  let history = useHistory()
  let location = useLocation()

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
    if (props.editMode && props.cardSet) {
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

  function handleChange(event, index) {
    const values = [...fields]

    if (event.name === `term-${index}`) {
      values[index].term = event.value
    }
    if (event.name === `definition-${index}`) {
      values[index].definition = event.value
    }

    setFields(values)
  }

  function handleRemove(index) {
    const values = [...fields]
    values.splice(index, 1)
    setFields(values)
  }

  function formValidation() {
    // Card set name must be entered
    if (cardSetName.value === '') {
      return 'Must enter a card name'
    }

    // Must create at least two flashcards
    if (fields.length < 2) {
      return 'Please create at least 2 flashcards'
    }

    // Must make sure no two terms match
    const fieldTerms = fields.map(val => val.term)
    const uniqueFields = new Set(fieldTerms)

    if (uniqueFields.size !== fieldTerms.length) {
      return 'All terms must be unique'
    }

    for (let field of fields) {
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
      const ids = initialState.map(state => state.id)
      let newFlashcards = fields.filter(field => !ids.includes(field.id))

      await postFlashcards(mainAxios, {
        fields: newFlashcards,
        card_set_id: props.cardSetId,
      })

      for await (const field of initialState) {
        await patchEditFlashcard(mainAxios, {field})
      }

      await patchCardSetFlashcardCount(mainAxios, {
        id: props.cardSetId,
        flashcards_count: initialState.length,
      })

      alert('Updated!')
      history.push(`/card-sets/${props.cardSetId}`)
    } catch (error) {
      console.log('error: ', error.response)
    }
  }

  async function createCardSetAndFlashcards() {
    try {
      const {
        data: {cardSetId},
      } = await postCardSet(mainAxios, {
        name: cardSetName.value,
        flashcards_count: fields.length,
        isPrivate,
      })

      // Save promises in variables
      const usersCardSetPromise = postUsersCardSet(mainAxios, {
        card_set_id: cardSetId,
      })

      const flashcardsPromise = postFlashcards(mainAxios, {
        fields,
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
              onClick={() => setFields(initialState)}
            >
              ERASE ALL ENTRIES
            </div>
            {props.editMode ? (
              <div
                className="p-2 bg-teal-500 text-white h-18  text-2xl self-center"
                onClick={() => setFields([{term: '', definition: ''}])}
              >
                DELETE ALL
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full mt-12">
          <TextBox
            id="title"
            required={true}
            error={{required: 'Must have a name for the card set'}}
            name="card-set-name"
            value={cardSetName.value}
            onChange={setCardSetName}
            placeholder={'Subject, chapter, unit'}
            type="text"
          />
          <label htmlFor="title" className="text-xs opacity-50 mt-1">
            TITLE
          </label>
        </div>
        <div className="flex justify-between">
          <div>
            Accessible to:
            <select
              className="border border-black outline-none ml-2"
              style={{textAlignLast: 'center'}}
              onChange={event => setPrivacy(event.target.value)}
              value={isPrivate}
            >
              <option value={true}>only you</option>
              <option value={false}>all</option>
            </select>
          </div>
        </div>
      </div>
      <div className="my-4 mx-8">
        {fields.map((field, index) => {
          return (
            <div key={index} className="w-full shadow-xl my-2 bg-white">
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
                    placeholder="Enter term"
                    onChange={event => handleChange(event, index)}
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
                    onChange={event => handleChange(event, index)}
                    value={field.definition}
                    type="text"
                    name={`definition-${index}`}
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
        onClick={() => setFields([...fields, {term: '', definition: ''}])}
      >
        <div className="m-6 flex justify-center items-center add-card-div border-b-4 border-teal-500 h-10">
          <i className="fas fa-plus text-xs add-card-plus"></i>
          <div className="ml-2 text-base add-card-text">ADD CARD</div>
        </div>
      </div>
      <div className="flex justify-end mb-2">
        <div
          onClick={handleSave}
          className="mt-4 mx-8 h-16 w-1/3 text-white bg-teal-500 flex justify-center items-center create-card-set-button"
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
