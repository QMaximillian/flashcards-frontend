import React, {useState, useEffect} from 'react'
import {fetchGetEditCardSets} from '../fetchRequests/cardSets'
import CreateCardSetForm from '../components/CreateCardSetForm'

export default function EditCardSet(props) {
  const [cardSet, setCardSet] = useState([])

  useEffect(() => {
    fetchGetEditCardSets(props.match.params.id).then(r => setCardSet(r))
  }, [props.match.params.id])

  return (
    <CreateCardSetForm
      editMode={true}
      cardSet={cardSet}
      cardSetId={props.match.params.id}
    />
  )
}
