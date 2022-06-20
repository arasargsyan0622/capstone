import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createListing, getListings } from "../../store/listing";
import "./add_listing.css"


const NewListing = ({ setShow }) => {
  const [errors, setErrors] = useState([])
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  // console.log("isAvailable". isAvailable)
  const [yearBuilt, setYearBuilt] = useState(0);
  const [parking, setParking] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState(0);
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  // const [image, setImage] = useState(null);

  const [agent, setAgent] = useState();
  const user = useSelector((state) => state.session.user);
  const agents = Object.values(useSelector((state) => state.agents));

  let agentId;

  agents.map((agent) => {
    agentId = agent?.id;
  });


  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    let errorsArray = []

    if (!address.length) {
      errorsArray.push("Please enter the address");
    }

    if (address.length > 50) {
      errorsArray.push("Address cannot be more than 50 characters");
    }

   if (!city.length) {
      errorsArray.push("Please enter the city");
    }

    if (city.length > 30) {
      errorsArray.push("City cannot be more than 30 characters");
    }

    if(zipcode.length !== 5) {
      errorsArray.push("Zipcode must have 5 digits")
    }

    if(!description.length) {
      errorsArray.push("Please enter the description")
    }

    if(!price || price < 0) {
      errorsArray.push("Please enter a valid price")
    }

    if(!bedrooms.length || bedrooms < 0) {
      errorsArray.push("Please enter a valid number of bedrooms")
    }

    if (bedrooms > 65) {
      errorsArray.push("Bedrooms cannot be more than 65");
    }

    if(!bathrooms.length || bathrooms < 0) {
      errorsArray.push("Please enter a valid number of bathrooms")
    }

    if (bathrooms > 40) {
      errorsArray.push("bathrooms cannot be more than 40");
    }

    if(!size.length || size < 0) {
      errorsArray.push("Please enter a valid size")
    }

    if (size > 200000) {
      errorsArray.push("Size cannot be more than 200,000 square feet");
    }

    if(!yearBuilt.length || yearBuilt < 0) {
      errorsArray.push("Please enter a valid yearBuilt")
    }

    if (yearBuilt > new Date().getFullYear()) {
      errorsArray.push("Year built cannot be in the future, hello?");
    }

    if(!url1.length) {
      errorsArray.push("Please enter a valid url for url1")
    }

    if(!url1.endsWith(".png") && !url1.endsWith(".jpg") && !url1.endsWith(".jpeg")) {
      errorsArray.push("Please enter a valid format for url1: .png, .jpg, or .jpeg")
    }

    if(!url2.length) {
      errorsArray.push("Please enter a valid url for url2")
    }

    if(!url2.endsWith(".png") && !url2.endsWith(".jpg") && !url2.endsWith(".jpeg")) {
      errorsArray.push("Please enter a valid format for url2: .png, .jpg, or .jpeg")
    }

    if(!url3.length) {
      errorsArray.push("Please enter a valid url for url3")
    }

    if(!url3.endsWith(".png") && !url3.endsWith(".jpg") && !url3.endsWith(".jpeg")) {
      errorsArray.push("Please enter a valid format for url3: .png, .jpg, or .jpeg")
    }

    if(errorsArray.length) {
      setErrors(errorsArray)
      return
    }

    const payload = {
      description,
      price,
      size,
      is_available: isAvailable,
      year_built: yearBuilt,
      parking,
      laundry,
      bedrooms,
      bathrooms,
      address,
      country: "USA",
      state,
      city,
      zipcode,
      url1,
      url2,
      url3,
      user_id: user.id,
      agent_id: agentId,
      // images_of_listing: image,
    };

    await dispatch(createListing(payload));
    history.push("/listings");
    setShow(false);
  };

  const handleCheckbox = (data) => {
    if (data === isAvailable) setIsAvailable(!isAvailable);
  };
  const handleCheckbox2 = (data) => {
    if (data === parking) setParking(!parking);
  };
  const handleCheckbox3 = (data) => {
    if (data === laundry) setLaundry(!laundry);
  };

  // const updateImage = e => {
  //   const file = e.target.files[0]
  //   setImage(file)
  // }

  return (
    <div>
      <form className="add-listing-form" onSubmit={handleSubmit}>
        <div className="listing-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <h1 className="country">
          {country}
        </h1>
        <input
          type="text"
          className="url1"
          placeholder="Url1"
          value={url1}
          onChange={(e) => setUrl1(e.target.value)}
        />
        <input
          type="text"
          className="url2"
          placeholder="Url2"
          value={url2}
          onChange={(e) => setUrl2(e.target.value)}
        />
        <input
          type="text"
          className="url3"
          placeholder="Url3"
          value={url3}
          onChange={(e) => setUrl3(e.target.value)}
        />
        {/* <label>Upload</label>
        <input
          type="file"
          accept="image/*"
          onChange={updateImage}
          /> */}
        <input
          type="text"
          className="add-description-input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
          <input
            type="text"
            placeholder="Address: 123 Cool Street/St."
            pattern="^\d+\s[A-z]+\s[A-z]+"
            className="add-address-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        <div className="full-address">
          <input
            type="text"
            placeholder="City: Your City"
            pattern="^[a-zA-Z\- ]+$"
            className="add-city-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <select className="add-state-input" onChange={e => setState(e.target.value)}>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
        </select>
        </div>
          <div className="zipcode-container">
            <label>Zipcode: </label>
            <input
              type="number"
              className="add-zipcode-input"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
        <div className="price-container">
          <label>Price: </label>
          <input
            type="number"
            className="add-price-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="bedroom-container">
          <label>Bedroom: </label>
          <input
            type="number"
            className="add-bedrooms-input"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>
        <div className="bathroom-container">
          <label>Bathroom: </label>
          <input
            type="number"
            className="add-bathrooms-input"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>
        <div className="size-container">
        <label>Size(sqft): </label>
        <input
          type="number"
          className="add-size-input"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        </div>
        <div className="year-built-container">
        <label>Year Built: </label>
        <input
          type="number"
          className="add-year-built-input"
          value={yearBuilt}
          onChange={(e) => setYearBuilt(e.target.value)}
        />
        </div>
        <div className="checkboxes-container">
          <div className="available-checkbox">
            <label>Is Available</label>
            <input
              type="checkbox"
              value={isAvailable}
              checked={isAvailable}
              onChange={() => handleCheckbox(isAvailable)}
            />
          </div>
          <div className="parking-checkbox">
          <label>Parking</label>
          <input
            type="checkbox"
            value={parking}
            checked={parking}
            onChange={() => handleCheckbox2(parking)}
          />
          </div>
          <div className="laundry-checkbox">
          <label>Laundry</label>
          <input
            type="checkbox"
            value={laundry}
            checked={laundry}
            onChange={() => handleCheckbox3(laundry)}
          />
          </div>
        </div>
        <div>
          <label className="agent-label">Agent: </label>
          <select className="agent-names" value={agent} onChange={(e) => setAgent(agent?.id)}>
            {agents.map((agent) => {
              return (
                  <option className="agent-options" key={agent?.id} value={agent?.id}>
                    {agent?.first_name}
                  </option>
              );
            })}
          </select>
        </div>
        <button className="add-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewListing;
