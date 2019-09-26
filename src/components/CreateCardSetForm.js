import React, { useState} from 'react'
import TextBox from './TextBox'
import { fetchPostCardSet } from '../fetchRequests/cardSets'
import { fetchPostFlashCards } from '../fetchRequests/flashcards'
 
 
export default function CreateCardSetForm(props){
		const [fields, setFields] = useState([{ term: '', definition: '' }]);
		const [cardSetName, setCardSetName] = useState('')

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
	
	async function handleSave(){
		try {
			const cardSet = await fetchPostCardSet({ name: cardSetName.value })

			await fetchPostFlashCards({ fields, card_set_id: cardSet.id })

			alert('Saved!')

			// Redirect here
		} catch(error) {
			console.log(error)
		}		
		
	}

  return (
    <div className="flex w-full flex-col p-4">
      <div className="w-1/6">
        <TextBox name="card-set-name" value={cardSetName.value} onChange={setCardSetName} placeholder={'Title'} />
      </div>
      {fields.map((field, idx) => {
        return (
          <div key={idx} className="flex w-full">
						<div className='self-center pr-2 text-lg'>{idx + 1}</div>
            <div className="w-1/2 mr-6" key={`${field}-definition-${idx}`}>
              <TextBox
                placeholder="Definition"
                onChange={e => handleChange(idx, e)}
                value={field.term}
                type="text"
                name={`term-${idx}`}
              />
            </div>
            <div className="w-1/2 ml-6" key={`${field}-answer-${idx}`}>
              <TextBox
                placeholder="Answer"
                onChange={e => handleChange(idx, e)}
                value={field.definition}
                type="text"
                name={`definition-${idx}`}
              />
            </div>
            <div onClick={() => handleRemove(idx)}>X</div>
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