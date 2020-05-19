import React from 'react'
import TextBox from './TextBox'
import Button from './Button'
export default function CardSetFields({
  fields,
  handleRemove,
  handleChange,
  setFields,
  handleSave,
  editMode,
}) {
  return (
    <form onSubmit={handleSave}>
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
      <div
        className="add-card shadow-lg bg-white justify-center items-center flex h-24 "
        onClick={() => setFields([...fields, {term: '', definition: ''}])}
      >
        <button
          type="button"
          className="m-6 flex justify-center items-center  border-b-4 border-teal-500 h-10"
        >
          <i className="fas fa-plus text-xs  pr-2" />
          ADD CARD
        </button>
      </div>
      <div className="flex justify-end mt-4">
        <div className="w-1/3 h-16">
          <Button buttonText={editMode ? 'Save' : 'Create'} />
        </div>
      </div>
    </form>
  )
}
