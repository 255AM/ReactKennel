import React, { useContext, useEffect } from "react"
import { SpeciesContext } from "./SpeciesProvider"
import { SpeciesCard } from "./SpeciesCard"
import { useHistory } from 'react-router-dom'
import "./Species.css"

export const SpeciesList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { species, getSpecies } = useContext(SpeciesContext)
  const history = useHistory() 

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("SpeciesList: useEffect - getSpecies")
    getSpecies()

  }, [])


  return (
      <>
        <h2>Species</h2>
    
        <button onClick={() => {history.push("/species/create")}}>
            Add Species
      </button>
      <div className="species">
      {console.log("SpeciesList: Render", species)}
      {
        species.map(species => {
          return <SpeciesCard key={species.id} species={species} />
        })
      }
    </div>
    </>
  )
}