import React from "react"
import "./Customer.css"

export const CustomerCard = ({ customer }) => (
    <section className="customer">
        <h3 className="customer__name">{customer.name}</h3>
        <h3 className="customer__addressd">{customer.address}</h3>
    </section>
)