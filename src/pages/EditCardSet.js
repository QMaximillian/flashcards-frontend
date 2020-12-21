import React, {useState, useEffect, useContext} from 'react'
import CreateCardSetForm from '../components/CreateCardSetForm'
import {FetchContext} from '../context/FetchContext'
import {CreateCardSetProvider} from '../context/CreateCardSetContext'
import Loading from '../components/Loading'

export default function EditCardSet(props) {
  const [cardSet, setCardSet] = useState([])
  const {mainAxios} = useContext(FetchContext)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    mainAxios
      .get(`/card-sets/${props.match.params.id}`)
      .then(res => {
        setCardSet(res.data.cardSet)
      })
      .finally(() => setLoading(false))
  }, [props.match.params.id, mainAxios])

  return isLoading ? (
    <div className="w-full h-full col-start-1 col-end-13 row-start-1 row-end-13">
      <Loading />
    </div>
  ) : (
    <CreateCardSetProvider cardSet={cardSet} mode="EDIT">
      <CreateCardSetForm {...props} />
    </CreateCardSetProvider>
  )
}
