import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
  const { getLocationById } = useContext(LocationContext)

	const [location, setLocation] = useState({})

	const {locationId} = useParams();
	const history = useHistory();

  useEffect(() => {
    console.log("useEffect", locationId)
    getLocationById(locationId)
    .then((response) => {
      setLocation(response)
    })
    }, [])

  return (
      <>
        <section className="location">
        {console.log(location.animals)}
        <h3 className="location__name">{location.name}</h3>
        <h4 className='location_address'>{location.address}</h4>
        <div className='animal__names'>
            {
                location.animals?.map(animal => {
                    return <p>{animal.name}</p>
                })
            }   
            </div>
        <div className='employee__names'>
        {
            location.employees?.map(animal => {
                return <p>{animal.name}</p>
            })
        }   
        </div>
        <div>
          <button onClick={()=>{
            history.push(`/locations/edit/${location.id}`)
          }}>Edit</button>
        </div>
      {/* What's up with the question mark???? See below.*/}
    </section>
    </>
  )
}
