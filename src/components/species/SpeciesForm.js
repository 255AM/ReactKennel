import React, { useContext, useEffect, useState } from "react"
import { SpeciesContext } from "../species/SpeciesProvider"


import "./Species.css"
import { useHistory, useParams } from 'react-router-dom';
import { SpeciesCard } from "../species/SpeciesCard";

export const SpeciesForm = () => {
    const { addSpecies, getSpecies } = useContext(SpeciesContext)
    
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the intial state of the form inputs with useState()
    */
    //for edit, hold on to state of animal in this view
    const [species, setSpecies] = useState({})
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newSpecies = { ...species }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newSpecies[event.target.id] = event.target.value
      // update state
      setSpecies(newSpecies)
    }

    const handleClickSaveSpecies = (event) => {
        addSpecies({
            name:species.name,
            
          })
          .then(() => history.push('/species'))
        }
    //Get locations, but I dont know why???????????????
    useEffect(()=>{
      getSpecies().then(()=>{
            setSpecies(species)
        })
        
    }, [])

    return (
      <form className="speciesForm">
          <h2 className="speciesForm__title">New Species</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Species name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Species Name" value={species.name}/>
              </div>
          </fieldset>
          
          
          <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              handleClickSaveSpecies()
            }}>
            Save Species
            </button>
      </form>
    )
}