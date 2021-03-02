import React from "react"
import "./Animal.css"

export const Animal = ({ animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <h3 className="customer__name">{customer.name}</h3>
        <h3 className="location__name">{location.name}</h3>
    </section>
)