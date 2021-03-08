import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import "./Location.css"
import { useHistory, useParams } from 'react-router-dom';


//this is a fx that is exported and imported at app views. Whenever the route is right due to the navbar, this fx runs
export const LocationForm = () => {
    const { addLocation, getLocations, updateLocation, getLocationById } = useContext(LocationContext)//importing and exporting
    //location is a variable, setLocation is a fx. useState jsut says to use react magic to track it
    const [location, setLocation] = useState({})
    //isLoading is nothing but a boolean. setIsLoading is a fx or method that is assigned to adjust isLoading as needed
    const [isLoading, setIsLoading] = useState(true);
    //LoactionId is the varaible that is in the route when location form is called, maybe. If it isnt in the route we know we are not editing
    const {locationId} = useParams();
    //history is just a way to set a route(similar to url)
    const history = useHistory();

    //this is a function that makes a copy of an object, updates that object as needed and then sets State with setLocation method. this is trggered below in the jsx when the dropdowns are adjusted
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newLocation = { ...location }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newLocation[event.target.id] = event.target.value
      // update state
      setLocation(newLocation)
    }

    // this function is triggered when the dual use button, "save/add location" is clicked. Its fired lower on this page in the jsx like an event handler
    const handleClickSaveLocation = () => {
      // if (location.name.value === null) {
      //   window.alert("Please select a location")
      // } else {
        //disable the button
        setIsLoading(true)
        //check the variable locationId, which is the variable in the route. if it exists, go to update by feeding the defined object to the update fx
        if(locationId){
          updateLocation({
            id: locationId,
            name: location.name,
            address: location.address
          })
          //then go back to detal application viewed using the history magic
          .then(()=> history.push(`/locations/detail/${location.id}`))
        }else {
          //THere was no id, make a new object by running addLocation with the defined object as the parameter
          addLocation({
            name:location.name,
            address:location.address
          })
          .then(() => history.push('/locations'))
        }
    }
    
    //get all locations, then if there is a locationid in the route, we know this is an edit. Get the chosen object called by the variable in route, set the location using the setLocation method. turn is loading to false. ////Else if ther is no update, just set isloading to false. useeffect runs everytime render runs The order is setsate - render - useeffect render happens 2x before we know useEffect does not run on the second render, beaacuse it is then watching the empty array as instructed  at the end with the empty brackets 
    useEffect(() => {
      getLocations().then(() => {
        if (locationId){
          getLocationById(locationId)
          .then(location => {
              setLocation(location)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    return (
      <form className="locationForm">
          <h2 className="locationForm__title">New Location</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Location name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location Name" value={location.name}/>
              </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
                  <label htmlFor="address">Location address:</label>
                  <input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location Address" value={location.address}/>
              </div>
          </fieldset>
          <fieldset>
              
          </fieldset>
          <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
              event.preventDefault()
              handleClickSaveLocation()
            }}>
            {locationId?<>Save Location</> : <>Add Location</>}</button>
      </form>
    )
}