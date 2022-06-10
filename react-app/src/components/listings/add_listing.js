import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createListing, getListings } from "../../store/listing";

const NewListing = ({ setShow }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [yearBuilt, setYearBuilt] = useState(0);
  const [parking, setParking] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const user = useSelector((state) => state.session.user);
  const agents = Object.values(useSelector(state => state.agents));

  // console.log("user in new listing", user);
  // const [userId, setUserId] = useState(0);
  // const [locationId, setLocationId] = useState(0);
  // const [agentId, setAgentId] = useState(0);
  // const [image, setImage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      price,
      size,
      isAvailable,
      year_built: yearBuilt,
      parking,
      laundry,
      bedrooms,
      bathrooms,
      user_id: user.id,
      // location_id: locationId,
      // agent_id: agentId,
      // image,
    }
    // console.log("payload in new listing", payload);
    const finishLoad = await dispatch(createListing(payload));
    history.push(`/listings/${finishLoad.id}`);
    setShow(false)
  };

  const handleCheckbox = (data) => {
    if(data===isAvailable)
      setIsAvailable(!isAvailable);
    }
    const handleCheckbox2 = (data) => {
    if(data===parking)
      setParking(!parking);
    }
    const handleCheckbox3 = (data) => {
    if(data===laundry)
      setLaundry(!laundry);
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Size:</label>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <label>Is Available:</label>
        <input
          type="checkbox"
          value={isAvailable}
          checked={isAvailable}
          onChange={() => handleCheckbox(isAvailable)}
        />
        <label>Year Built:</label>
        <input
          type="text"
          value={yearBuilt}
          onChange={(e) => setYearBuilt(e.target.value)}
        />
        <label>Parking:</label>
        <input
          type="checkbox"
          value={parking}
          checked={parking}
          onChange={() => handleCheckbox2(parking)}
        />
        <label>Laundry:</label>
        <input
          type="checkbox"
          value={laundry}
          checked={laundry}
          onChange={() =>  handleCheckbox3(laundry)}
        />
        <label>Bedrooms:</label>
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        <label>Bathrooms:</label>
        <input
          type="number"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default NewListing;
