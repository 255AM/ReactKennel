import React from "react"
import "./Location.css"

export const LocationCard = ({ location }) => (
    <section className="location">
        <h3 className="location__name">{location.name}</h3>
        <h3 className="location__address">{location.address}</h3>
    </section>
)