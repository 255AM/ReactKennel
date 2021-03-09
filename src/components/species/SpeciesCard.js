import React from "react"
import "./Species.css"
import {Link} from "react-router-dom"

export const SpeciesCard = ({ species }) => (
    <section className="species">
        <h3 className="species__name">{ species.name }</h3>
        
    </section>
)