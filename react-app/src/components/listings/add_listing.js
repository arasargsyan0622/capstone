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
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState(0);
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
      address,
      country,
      state,
      city,
      zipcode,
      user_id: user.id,
      agent_id: agentId,
      // images_of_listing: image,
    };
    // console.log("payload in add listing", payload)

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
      <form onSubmit={handleSubmit}>
        {/* <label>Upload</label>
        <input
          type="file"
          accept="image/*"
          onChange={updateImage}
          /> */}
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
          type="number"
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
          onChange={() => handleCheckbox3(laundry)}
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
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>Zip:</label>
        <input
          type="number"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <select value={agent} onChange={(e) => setAgent(agent?.id)}>
          {agents.map((agent) => {
            return (
              <option key={agent?.id} value={agent?.id}>
                {agent?.first_name}
              </option>
            );
          })}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewListing;
