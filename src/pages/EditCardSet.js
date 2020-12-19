import React, {useState, useEffect, useContext} from 'react'
import CreateCardSetForm from '../components/CreateCardSetForm'
import {FetchContext} from '../context/FetchContext'
import {CreateCardSetProvider} from '../context/CreateCardSetContext'

export default function EditCardSet(props) {
  const [cardSet, setCardSet] = useState([])
  const {mainAxios} = useContext(FetchContext)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    mainAxios.get(`/card-sets/${props.match.params.id}`).then(res => {
      setCardSet(res.data.cardSet)
      setLoading(false)
    })
  }, [props.match.params.id, mainAxios])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <CreateCardSetProvider cardSet={cardSet} editMode={true}>
      <CreateCardSetForm
        cardSet={cardSet}
        cardSetId={props.match.params.id}
        editMode={true}
        {...props}
      />
    </CreateCardSetProvider>
  )
}
