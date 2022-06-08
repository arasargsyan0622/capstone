import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createListing } from "../../store/listing";

const NewListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [yearBuilt, setYearBuilt] = useState("");
  const [parking, setParking] = useState("");
  const [laundry, setLaundry] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [image, setImage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createListing({ title, description, price, image }));
    history.push("/listings");
  };

  return (
    <div>
      <h1>New Listing</h1>
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
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Size:</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <label>Is Available:</label>
        <input
          type="checkbox"
          value={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
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
          onChange={(e) => setParking(e.target.value)}
        />
        <label>Laundry:</label>
        <input
          type="checkbox"
          value={laundry}
          onChange={(e) => setLaundry(e.target.value)}
        />
        <label>Bedrooms:</label>
        <input
          type="text"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        <label>Bathrooms:</label>
        <input
          type="text"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
        <label>Image:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default NewListing;
