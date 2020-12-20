import React from 'react'
import CreateCardSetHeader from './CreateCardSetHeader'
import CreateCardSetFields from './CreateCardSetFields'
import CreateCardSetFooter from './CreateCardSetFooter'
import PropTypes from 'prop-types'

function CreateCardSetForm({editMode}) {
  return (
    <form
      onSubmit={event => event.preventDefault()}
      id="card-set-form"
      className="col-start-1 col-end-13 row-start-1 row-end-13 flex w-full flex-col bg-gray-300 overflow-auto"
    >
      <CreateCardSetHeader />
      <div className="bg-gray-300 my-4 mx-8">
        <CreateCardSetFields />
      </div>
      <CreateCardSetFooter editMode={editMode} />
    </form>
  )
}

CreateCardSetForm.propTypes = {
  editMode: PropTypes.bool,
}

export default CreateCardSetForm
