import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {fetchGetEditCardSets} from '../fetchRequests/cardSets'
import CreateCardSetForm from '../components/CreateCardSetForm'

export default function EditCardSet(props) {
  const [cardSet, setCardSet] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchGetEditCardSets(props.match.params.id).then(r => {
      setCardSet(r)
      setIsLoading(false)
    })
  }, [props.match.params.id])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <CreateCardSetForm
      editMode={true}
      cardSet={cardSet}
      cardSetId={props.match.params.id}
    />
  )
}

EditCardSet.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}
