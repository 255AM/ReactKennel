import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "../employee/EmployeeProvider"

import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom';
import { Animal } from "../animal/Animal";

export const EmployeeForm = () => {
    const { addEmployee, getEmployees, updateEmployee, getEmployeeById } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the intial state of the form inputs with useState()
    */
    //for edit, hold on to state of animal in this view
    const [employee, setEmployee] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const {employeeId} = useParams();
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newEmployee = { ...employee }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newEmployee[event.target.id] = event.target.value
      // update state
      setEmployee(newEmployee)
    }

    const handleClickSaveEmployee = (event) => {
      if (employee.locationId === 0) {
        window.alert("Please select a location")
      } else {
        //disable the button
        setIsLoading(true)
        if(employeeId){
          //if we have clicked on an existing employee, there will be an id, so we know we need to edit
          //but where are we searching for this id????????????
          updateEmployee({
            id:employee.id,
            name: employee.name,
            locationId: parseInt(employee.locationId)
          })
          .then(()=> history.push(`/employees/detail/${employee.id}`))
        }else {
          //THere was no id, make a new object
          addEmployee({
            name:employee.name,
            locationId: parseInt(employee.locationId),
          })
          .then(() => history.push('/employees'))
        }
      }
    }

    //Get locations, but I dont know why???????????????
    useEffect(()=>{
      getLocations().then(()=>{
        if (employeeId){
          getEmployeeById(employeeId)
          .then(employee=>{
            setEmployee(employee)
            setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    return (
      <form className="employeeForm">
          <h2 className="employeeForm__title">New Employee</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Employee name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee Name" value={employee.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <select defaultValue={employee.locationId} name="locationId" id="locationId" onChange={handleControlledInputChange}className="form-control" >
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <fieldset>
              
          </fieldset>
          <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              handleClickSaveEmployee()
            }}>
            {employeeId?<>Save Employee</> : <>Add Employee</>}</button>
      </form>
    )
}