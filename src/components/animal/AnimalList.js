import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { Animal } from "./Animal"
import { useHistory } from 'react-router-dom'
import "./Animal.css"

export const AnimalList = () => {
    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const history = useHistory()

    useEffect(() => {
        console.log("AnimalList: Initial render before data")
        getLocations()
        .then(getCustomers)
        .then(getAnimals)
    }, [])

return (
  <>
    <h2>Animals</h2>
		  <button onClick={() => {history.push("/animals/create")}}>
            Add Animal
      </button>
  <div className="animals">

    {animals.map(singleAnimalInLoop => {
      const owner = customers.find(c => c.id === singleAnimalInLoop.customerId)
      const clinic = locations.find(l => l.id === singleAnimalInLoop.locationId)
      
  
      return <Animal key={singleAnimalInLoop.id}
                  location={clinic}
                  customer={owner}
                  animal={singleAnimalInLoop} />
  })}
  </div>
  
  </>
)
}