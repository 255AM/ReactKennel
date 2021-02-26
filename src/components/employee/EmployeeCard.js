import React from "react"
import "./Employee.css"

export const EmployeeCard = ({ employee }) => (
    <section className="employee">
        <h3 className="employee__name">{employee.name}</h3>
        <h3 className="employee__Location">{employee.locationId}</h3>
    </section>
)