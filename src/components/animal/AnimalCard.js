import React from "react"
import "./Animal.css"

export const AnimalCard = ({ animal }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <h3 className="animal__breed">{animal.breed}</h3>
    </section>
)