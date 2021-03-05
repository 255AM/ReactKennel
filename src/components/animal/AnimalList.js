import React, { useState, useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"
import {useHistory} from "react-router-dom"


import "./Animal.css"


export const AnimalList = () => {
  //state is array or data
  //animals is jsut a copy of return
  const { getAnimals, animals } = useContext(AnimalContext)
  //a magic way to do import
  const history = useHistory()

    // Initialization effect hook -> Go get animal data
    useEffect(()=>{
      getAnimals()
  }, [])

  return (
    <>
        <h1>Animals</h1>

        <button onClick={() => history.push("/animals/create")}>
            Make Reservation
        </button>
        <div className="animals">
            {
                animals.map(animal => {
                    return <Animal key={animal.id} animal={animal} />
                })
            }
        </div>
    </>
)
}



