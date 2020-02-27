import React, {useState, useEffect} from 'react'
import TextBox from './TextBox'
import {
  fetchPostCardSet,
  fetchPostUpdateCardSetFlashcardCount,
} from '../fetchRequests/cardSets'
import {fetchPostUsersCardSet} from '../fetchRequests/usersCardSets'
import {
  fetchPostFlashCards,
  fetchPatchEditFlashcard,
} from '../fetchRequests/flashcards'
import {useHistory} from 'react-router-dom'

export default function CreateCardSetForm(props) {
  const initialState = Array.from({length: 2}, () => ({
    term: '',
    definition: '',
  }))
  const [fields, setFields] = useState(initialState)
  const [cardSetName, setCardSetName] = useState({
    name: 'card-set-name',
    value: '',
    isValid: true,
  })
  const [isPrivate, setPrivacy] = useState(true)
  const history = useHistory()

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

  // function handleAdd() {
  //   const values = [...fields];
  //   values.push({ value: '' });
  //   setFields(values);
  // }

  function handleRemove(i) {
    const values = [...fields]
    values.splice(i, 1)
    setFields(values)
  }

  async function handleSave() {
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
      try {
        fields.forEach(async field => {
          await fetchPatchEditFlashcard(field)
        })

        await fetchPostUpdateCardSetFlashcardCount({
          id: props.cardSetId,
          flashcards_count: fields.length,
        })

        alert('Updated!')
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const cardSet = await fetchPostCardSet({
          name: cardSetName.value,
          flashcards_count: fields.length,
          isPrivate: isPrivate,
        })

        await fetchPostUsersCardSet({card_set_id: cardSet.id})
        await fetchPostFlashCards({fields, card_set_id: cardSet.id})

        alert('Saved!')

        history.push(`/card-sets/${cardSet.id}`)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="flex w-full flex-col bg-gray-300 overflow-auto">
      <div className="bg-white p-4">
        <div className="mt-6 flex justify-between">
          <div className="text-3xl opacity-75 font-bold bg-white">
            Create a new study set
          </div>
          <div className="flex justify-end">
            <div
              className="m-2 p-2 bg-teal-500 text-white h-18  text-2xl self-center"
              onClick={() => setFields(initialState)}
            >
              ERASE ALL ENTRIES
            </div>
            {/* <div
              onClick={handleSave}
              className="p-2 ml-2 bg-teal-500 text-white h-18  text-2xl self-center"
            >
              CREATE SET
            </div> */}

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
              onChange={e => setPrivacy(e.target.value)}
              value={isPrivate}
            >
              <option value={true}>only you</option>
              <option value={false}>all</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 my-4 mx-8">
        {fields.map((field, idx) => {
          return (
            <div key={idx} className="w-full shadow-xl my-2 bg-white">
              <div className="border-b border-gray-500 h-16 flex justify-between item-center">
                <div className="font-semibold self-center pr-2 text-lg h-164 pl-6 text-gray-500">
                  {idx + 1}
                </div>
                <div
                  className="ml-2 self-center my-6 pr-4"
                  onClick={() => handleRemove(idx)}
                >
                  X
                </div>
              </div>
              <div className="flex w-full pt-2 pb-8">
                <div
                  className="w-1/2 my-6 mr-6 pl-4"
                  key={`${field}-definition-${idx}`}
                >
                  <TextBox
                    // required={true}
                    // error={{required: "Please enter corresponding answer"}}
                    placeholder="Enter term"
                    onChange={e => handleChange(idx, e)}
                    value={field.term}
                    type="text"
                    name={`term-${idx}`}
                  />
                  <label className="text-xs opacity-50 mt-1">TERM</label>
                </div>
                <div
                  className="w-1/2 my-6 ml-6 pr-4"
                  key={`${field}-answer-${idx}`}
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
          className="mt-4 mx-8 h-16 w-1/3 text-white bg-teal-500 flex justify-center items-center create-card-set-button"
          onClick={handleSave}
        >
          <div className="create-text text-lg">Create Set</div>
        </div>
      </div>
    </div>
  )
}
