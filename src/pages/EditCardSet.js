import React, {useState, useEffect, useContext} from 'react'
import CreateCardSetForm from '../components/CreateCardSetForm'
import {FetchContext} from '../context/FetchContext'

export default function EditCardSet(props) {
  const [cardSet, setCardSet] = useState([])
  const {mainAxios} = useContext(FetchContext)
  useEffect(() => {
    mainAxios
      .get(`/card-sets/${props.match.params.id}`)
      .then(res => setCardSet(res.data.cardSet))
  }, [props.match.params.id, mainAxios])

  return (
    <CreateCardSetForm
      cardSet={cardSet}
      cardSetId={props.match.params.id}
      editMode={true}
    />
  )
}
