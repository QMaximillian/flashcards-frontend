import React, { useState} from 'react'
import TextBox from './TextBox'

 
 
// export default function CreateCardSetForm(props){
//     const [count, setCount] = React.useState(1);
//     const [flashCards, setFlashCards] = React.useState([generateCardSet()])
// 		// handleChange = () => {
// 		// 	setTextBox([name]: value)
// 		// }

		
//         function generateCardSet() {
// 					return (
//             <div className="flex w-full">
//               <div className="w-1/2 mx-2">
//                 <TextBox
//                   key={`name${count}`}
//                   placeholder="Definition"
//                   onChange={(e) => setFlashCards(prevState => ({...prevState, [e.target.name]: e.target.value}))}
//                   name={`textBox${count}-name`}
//                   value={}
//                   type="text"
//                 />
//               </div>
//               <div className="w-1/2 mx-2">
//                 <TextBox
//                   key={`value-${count}`}
//                   placeholder="Answer"
//                   onChange={() => {}}
//                   name={`textBox${count}-value`}
//                   // value={() => {}}
//                   type="text"
//                 />
//               </div>
//             </div>
//           );
//         }
   
//        return (
//          <div>
//            {/* <div className="flex w-full">
//              <div className="w-1/2 mx-2">
//                <TextBox type="text" />
//              </div>
//              <div className="w-1/2 mx-2">
//                <TextBox type="text" />
//              </div>
//            </div> */}
//            {flashCards}
//            <div onClick={(state) => {
// 						 setCount(count => count + 1)
// 						 console.log(count)
// 						 setFlashCards([...flashCards, generateCardSet()])
// 					 }}>CREATE NEW FLASHCARD</div>
//          </div>
//        );
// }



export default function(props){
	  const [fields, setFields] = useState([{ value1: '', value2: '' }]);

  function handleChange(i, event) {
		const values = [...fields];
		console.log(event.name)
		if (event.name === `definition-${i}`) {
			values[i].value1 = event.value;
		}
		if (event.name === `answer-${i}`) {
      values[i].value2 = event.value;
    }
    
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: '' });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  return (
    <div className="flex w-full flex-col">
      {fields.map((field, idx) => {
        return (
          <div className="flex w-full">
            <div className="w-1/2 mx-2" key={`${field}-definition-${idx}`}>
              <TextBox
                key={"1234"}
                placeholder="Definition"
                onChange={e => handleChange(idx, e)}
                // name={`textBox${count}-name`}
                value={field.value1}
                type="text"
                name={`definition-${idx}`}
              />
            </div>
            <div className="w-1/2 mx-2" key={`${field}-answer-${idx}`}>
              <TextBox
                placeholder="Answer"
                onChange={e => handleChange(idx, e)}
                value={field.value2}
                type="text"
                name={`answer-${idx}`}
              />
            </div>
          </div>
        );
			})}
			<div onClick={() => 
 						 setFields([...fields, { value1: '', value2: ''}])
 				}>CREATE NEW FLASHCARD</div>

		</div>
		);

}