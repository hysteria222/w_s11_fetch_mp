import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DogsList({ dogs, getDogs, setCurrentId }) {
  const navigate = useNavigate()
  const editDog = id => {
    setCurrentId(id)
    navigate('form')
  }
  const deleteDog = id => {
    fetch(`/api/dogs/${id}`, {method: 'DELETE' })
    .then(res => {
      if(!res.ok) throw new Error('Problem deleting')
      getDogs()
      setCurrentId(null)
    })
    .catch(err => console.error(err))
  }

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {
          dogs.map(dog => (
            <li key={dog.id}>
              {dog.name}, {dog.breed}, {dog.adopted ? '' : 'NOT '}adopted
              <div>
                <button onClick={() => editDog(dog.id)}>Edit</button>
                <button onClick={() => deleteDog(dog.id)}>Delete</button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
