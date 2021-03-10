import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"
import "./Animal.css"
import { useHistory } from "react-router-dom"

//AnimalList is exported and called at appviews when route is /animals. 
export const AnimalList = () => {
    //Bringing these in at AnimalContext.Provider on the provider file
  const { animals, getAnimals, searchTerms, filterTerms } = useContext(AnimalContext)
  

  // Since you are no longer ALWAYS displaying all of the animals
  // set filteredAnimals to state as empty array
  const [ filteredAnimals, setFiltered ] = useState([])
  const [ filteredSpecies, setFilteredSpecies ] = useState([])
  //use history to change route as needed
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render, will not run the 2nd time because of the empty dependancy array
  useEffect(() => {
      getAnimals()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "0") {
      // If the search field is not blank, display matching animals
      //subset is array of animals with matchign chars (all forced to lower case)
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
      //calling setFiltered with subset as argument. Changes state, useEffect will run each time because of dependancy (constantly monitoring??)
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(animals)
    }
  }, [searchTerms, animals])

  


  return (
    <>
      <h1>Animals</h1>

      <button onClick={() => history.push("/animals/create")}>
          Make Reservation
      </button>
      <div className="animals">
      {
        filteredAnimals.map(animal => {
          return <Animal key={animal.id} animal={animal} species={animal.species.name}/>
        })
      }
      </div>
    </>
  )
}







// import React, { useState, useContext, useEffect } from "react"
// import { AnimalContext } from "./AnimalProvider"
// import { Animal } from "./Animal"
// import {useHistory} from "react-router-dom"


// import "./Animal.css"


// export const AnimalList = () => {
//   //state is array or data
//   //animals is jsut a copy of return
//   const { getAnimals, animals } = useContext(AnimalContext)
//   //a magic way to do import
//   const history = useHistory()

//     // Initialization effect hook -> Go get animal data
//     useEffect(()=>{
//       getAnimals()
//   }, [])

//   return (
//     <>
//         <h1>Animals</h1>

//         <button onClick={() => history.push("/animals/create")}>
//             Make Reservation
//         </button>
//         <div className="animals">
//             {
//                 animals.map(animal => {
//                     return <Animal key={animal.id} animal={animal} />
//                 })
//             }
//         </div>
//     </>
// )
// }



