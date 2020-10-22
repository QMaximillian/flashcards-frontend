import React, {useState, useEffect, useContext} from 'react'
import CreateCardSetForm from '../components/CreateCardSetForm'
import {FetchContext} from '../context/FetchContext'

export default function EditCardSet(props) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [cardSet, setCardSet] = useState({})
  const {mainAxios} = useContext(FetchContext)
  useEffect(() => {
    setStatus('pending')
    mainAxios.get(`/card-sets/${props.match.params.id}`).then(
      res => {
        setStatus('resolved')
        setCardSet(res.data.cardSet)
      },
      error => {
        setStatus('rejected')
        setError(error)
      },
    )
  }, [props.match.params.id, setError, setStatus, mainAxios])

  switch (status) {
    case 'idle':
      return <div></div>
    case 'pending':
      return <div>Loading...</div>
    case 'resolved':
      return (
        <CreateCardSetForm
          editMode={true}
          cardSet={cardSet}
          cardSetId={props.match.params.id}
        />
      )
    case 'rejected':
      return <div>Error: {error}</div>
    default:
      throw new Error(
        `This status state should be unreachable, status: ${status}`,
      )
  }
}
