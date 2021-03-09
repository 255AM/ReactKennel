import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const SpeciesContext = createContext()

// This component establishes what data can be used.
export const SpeciesProvider = (props) => {
    const [species, setSpecies] = useState([])

    const getSpecies = () => {
        return fetch("http://localhost:8088/species")
        .then(res => res.json())
        .then(setSpecies)
    }

    const addSpecies = speciesObj => {
        return fetch("http://localhost:8088/species", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(speciesObj)
        })
        .then(getSpecies)
    }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <SpeciesContext.Provider value={{
            species, getSpecies, addSpecies
        }}>
            {props.children}
        </SpeciesContext.Provider>
    )
}