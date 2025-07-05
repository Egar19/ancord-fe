import { useParams } from 'react-router-dom'

const DetailPage = () => {

  const {id} = useParams();

  return (
    <h2>Detail Page {id} </h2>
  )
}

export default DetailPage