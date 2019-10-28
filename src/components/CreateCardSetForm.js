import React, { useState, useEffect} from 'react'
import TextBox from './TextBox'
import { fetchPostCardSet, fetchPostUpdateCardSetFlashcardCount } from '../fetchRequests/cardSets'
import {
  fetchPostFlashCards,
  fetchPatchEditFlashcard
} from "../fetchRequests/flashcards";
 
 
export default function CreateCardSetForm(props){
		const [fields, setFields] = useState([{ term: '', definition: '' }]);
		const [cardSetName, setCardSetName] = useState({
      name: "card-set-name",
      value: "",
      isValid: true
    });


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
          const cardSet = await fetchPostCardSet({ name: cardSetName.value, flashcards_count: fields.length });

          await fetchPostFlashCards({ fields, card_set_id: cardSet.id });

          alert("Saved!");

          // Redirect here
        } catch (error) {
          console.log(error);
        }	
    }

  }
  
  return (
    <div className="flex w-full flex-col p-4">
      <div className="w-1/6">
        <TextBox required={true} error={{required: "Must have a name for the card set"}} name="card-set-name" value={cardSetName.value} onChange={setCardSetName} placeholder={'Title'} />
      </div>
      {fields.map((field, idx) => {
        return (
          <div key={idx} className="flex w-full">
            <div className="self-center pr-2 text-lg">{idx + 1}</div>
            <div className="w-1/2 my-6 mr-6" key={`${field}-definition-${idx}`}>
              <TextBox
                // required={true}
                // error={{required: "Please enter corresponding answer"}}
                placeholder="Definition"
                onChange={e => handleChange(idx, e)}
                value={field.term}
                type="text"
                name={`term-${idx}`}
              />
            </div>
            <div className="w-1/2 my-6 ml-6" key={`${field}-answer-${idx}`}>
              <TextBox
                // required={true}
                // error={{required: "Please enter corresponding definition"}}
                placeholder="Answer"
                onChange={e => handleChange(idx, e)}
                value={field.definition}
                type="text"
                name={`definition-${idx}`}
              />
            </div>
            <div
              className="ml-2 self-center my-6"
              onClick={() => handleRemove(idx)}
            >
              X
            </div>
          </div>
        );
      })}
      <div>
        <div onClick={() => setFields([...fields, { term: "", definition: "" }])}>
          CREATE NEW FLASHCARD
        </div>
        <div onClick={() => setFields([{ term: '', definition: ''}])}>
          DELETE ALL
        </div>
      </div>
			<div 
				className={'mt-24'}
				onClick={handleSave}>SAVE SET</div>
    </div>
  );

}