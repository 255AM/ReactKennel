import React from "react"
import "./Animal.css"
import {Link} from "react-router-dom"


export const Animal = ({animal, species}) => (
    <section className="animal">
      <h3 className="animal__name">
        <Link to={`/animals/detail/${animal.id}`}>
          { animal.name }
        </Link>
      </h3>
      <h3 className="animal_species"> {species}</h3>
    </section>

)