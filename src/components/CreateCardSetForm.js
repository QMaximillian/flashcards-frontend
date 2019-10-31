import React, { useState, useEffect} from 'react'
import TextBox from './TextBox'
import { fetchPostCardSet, fetchPostUpdateCardSetFlashcardCount } from '../fetchRequests/cardSets'
import { fetchPostUsersCardSet } from '../fetchRequests/usersCardSets'
import {
  fetchPostFlashCards,
  fetchPatchEditFlashcard
} from "../fetchRequests/flashcards";


 

export default function CreateCardSetForm(props){
		const [fields, setFields] = useState(
      Array.from({ length: 5 }, () => ({ term: "", definition: "" }))
    );
		const [cardSetName, setCardSetName] = useState({
      name: "card-set-name",
      value: "",
      isValid: true
    });
    const [isPrivate, setPrivacy] = useState(true)


  useEffect(() => {
    if (props.editMode && props.cardSet) {

      const editCardSet = props.cardSet.map(flashcard => {
        return {id: flashcard.id, term: flashcard.term, definition: flashcard.definition}
      })

      setFields(editCardSet)
      setCardSetName(props.cardSet[0] ? ({name: cardSetName.name, value: props.cardSet[0].name, isValid: true}) : {})
    }
  }, [props.editMode, props.cardSet, cardSetName.name])


  function handleChange(i, event) {
		const values = [...fields];
		console.log(event.name)
		if (event.name === `term-${i}`) {
			values[i].term = event.value;
		}
		if (event.name === `definition-${i}`) {
      values[i].definition = event.value;
    }
    
    setFields(values);
  }

  // function handleAdd() {
  //   const values = [...fields];
  //   values.push({ value: '' });
  //   setFields(values);
  // }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
	}
  
  // function errorCheck(){
    
  // }

	async function handleSave(){
     if (cardSetName.value === "") {
       alert("Must enter a card name");
       return;
     }

     const trigger = fields.every((field) => {
       return (field.definition && !field.term) ||
            (!field.definition && field.term)
     })

     if (trigger) {
       alert(`Please complete flashcard term or definition in all rows`);
       return
     }
     

    if (props.editMode) {
      try {
        fields.forEach(async field => {
          await fetchPatchEditFlashcard(field);
        })
          console.log(props)
        await fetchPostUpdateCardSetFlashcardCount({id: props.cardSetId, flashcards_count: fields.length})
        
        alert('Updated!')
      } catch(e) {
        console.log(e)
      }
    } else {
        try {
          const cardSet = await fetchPostCardSet({ name: cardSetName.value, flashcards_count: fields.length, private: isPrivate });

          await fetchPostUsersCardSet({ card_set_id: cardSet.id })
          await fetchPostFlashCards({ fields, card_set_id: cardSet.id });

          alert("Saved!");

          // Redirect here
        } catch (error) {
          console.log(error);
        }	
    }

  }
  
  return (
    <div className="flex w-full flex-col bg-gray-300">
      <div className="bg-white p-4">
        {!props.editMode ? (
          <div className="mt-6 text-3xl opacity-75 font-bold bg-white">
            Create a new study set
          </div>
        ) : null}
        <div className="w-full mt-12">
          <TextBox
            required={true}
            error={{ required: "Must have a name for the card set" }}
            name="card-set-name"
            value={cardSetName.value}
            onChange={setCardSetName}
            placeholder={"Subject, chapter, unit"}
          />
          <div className="text-xs opacity-50 mt-1">TITLE</div>
        </div>
        <div className="flex justify-between">
          <div onClick={() => setPrivacy(!isPrivate)} className="">{isPrivate ?  'Accessible to only you' : 'Accessible to all'}</div>
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
                  <div className="text-xs opacity-50 mt-1">TERM</div>
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
                  <div className="text-xs opacity-50 mt-1">DEFINITION</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="shadow-lg bg-white mx-8 justify-center items-center flex h-24">
        <div className=" flex justify-center items-center mb-1 add-card-div border-b-4 border-teal-500 p-2 h-10">
          <i className="fas fa-plus text-xs add-card-plus"></i>
          <div
            className="ml-2 text-base add-card-text"
            onClick={() => setFields([...fields, { term: "", definition: "" }])}
          >
            ADD CARD
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className="mt-4 mx-8 h-16 w-1/3 text-white bg-teal-500 flex justify-center items-center create-card-set-button"
          onClick={handleSave}
        >
          <div className="create-text text-lg">Create Set</div>
        </div>
      </div>
      <div onClick={() => setFields([{ term: "", definition: "" }])}>
        DELETE ALL
      </div>
    </div>
  );

}