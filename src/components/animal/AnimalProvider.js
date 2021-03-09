import React, { useState, createContext } from "react"
//setAnimal

// The context is imported and used by individual components that need data
export const AnimalContext = createContext()

// This component establishes what data can be used.This function is called on the appviews file whenver the route is /animals
export const AnimalProvider = (props) => {
    //statefunction
    const [animals, setAnimals] = useState([])
    //new magic state. tracking searchTerms, set to empty string right now. We need to export setSearchTerms below. We generally have not exported setters, setAnimals for instance, becuase it is called everytime we use getAnimals
    const [ searchTerms, setSearchTerms ] = useState("")


    const getAnimals = () => {
        return fetch("http://localhost:8088/animals?_expand=location")
        .then(res => res.json())
        .then(setAnimals)
    }

    const addAnimal = animalObj => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
        .then(getAnimals)
    }

    const getAnimalById = (id) => {
        return fetch(`http://localhost:8088/animals/${id}?_expand=location&_expand=customer`)
            .then(res => res.json())
            
    }

    const releaseAnimal = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
            .then(getAnimals)
    }

    const updateAnimal = animal => {
        return fetch(`http://localhost:8088/animals/${animal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(animal)
        })
          .then(getAnimals)
      }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <AnimalContext.Provider value={{
            animals, getAnimals, addAnimal, getAnimalById, releaseAnimal, updateAnimal, setSearchTerms, searchTerms
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}

