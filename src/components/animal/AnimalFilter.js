import React, { useContext } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"

export const SpeciesFilter = () => {
  const { setFilterTerms } = useContext(AnimalContext)

  return (
    <fieldset>
          <div className="form-group">
            <label htmlFor="location">Assign to location: </label>
            <select value={animal.locationId} name="locationId" id="animalLocation" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a location</option>
              {locations.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
    </fieldset>
  )
}