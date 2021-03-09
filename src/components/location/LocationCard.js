import React from "react"
import "./Location.css"
import {Link} from "react-router-dom"

export const LocationCard = ({ location, employeeCount, animalCount }) => (
    <section className="location">
        <h3 className="location__name">
        <Link to={`/locations/detail/${location.id}`}>
            { location.name }
        </Link>
        </h3>
        <h3 className="employee-count">Employees: {employeeCount}</h3>
        <h3 className="animal-count">Animals: {animalCount}</h3>
    </section>
)