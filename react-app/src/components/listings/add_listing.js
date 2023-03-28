import React, { useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createListing, uploadFile } from "../../store/listing";
import "./add_listing.css";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const NewListing = ({ setShow }) => {

//  starting for combo
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => lat, lng: () => lng },
      radius: 200 * 1000,
    },
  });

// ending for combo


  const [errors, setErrors] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [yearBuilt, setYearBuilt] = useState(0);
  const [parking, setParking] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
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
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let errorsArray = [];
    const addressArray = value.split(",")

    if (!description.length) {
      errorsArray.push("Please enter the description");
    }

    if (!price || price < 0) {
      errorsArray.push("Please enter a valid price");
    }

    if (!bedrooms.length || bedrooms < 0) {
      errorsArray.push("Please enter a valid number of bedrooms");
    }

    if (bedrooms > 65) {
      errorsArray.push("Bedrooms cannot be more than 65");
    }

    if (!bathrooms.length || bathrooms < 0) {
      errorsArray.push("Please enter a valid number of bathrooms");
    }

    if (bathrooms > 40) {
      errorsArray.push("bathrooms cannot be more than 40");
    }

    if (!size.length || size < 0) {
      errorsArray.push("Please enter a valid size");
    }

    if (size > 200000) {
      errorsArray.push("Size cannot be more than 200,000 square feet");
    }

    if (!yearBuilt.length || yearBuilt < 0) {
      errorsArray.push("Please enter a valid yearBuilt");
    }

    if (yearBuilt > new Date().getFullYear()) {
      errorsArray.push("Year built cannot be in the future, hello?");
    }

    if (!url1.length) {
      errorsArray.push("Please enter a valid url for url1");
    }

    if (
      !url1.endsWith(".png") &&
      !url1.endsWith(".jpg") &&
      !url1.endsWith(".jpeg")
    ) {
      errorsArray.push(
        "Please enter a valid format for url1: .png, .jpg, or .jpeg"
      );
    }

    if (!url2.length) {
      errorsArray.push("Please enter a valid url for url2");
    }

    if (
      !url2.endsWith(".png") &&
      !url2.endsWith(".jpg") &&
      !url2.endsWith(".jpeg")
    ) {
      errorsArray.push(
        "Please enter a valid format for url2: .png, .jpg, or .jpeg"
      );
    }

    if (!url3.length) {
      errorsArray.push("Please enter a valid url for url3");
    }

    if (
      !url3.endsWith(".png") &&
      !url3.endsWith(".jpg") &&
      !url3.endsWith(".jpeg")
    ) {
      errorsArray.push(
        "Please enter a valid format for url3: .png, .jpg, or .jpeg"
      );
    }

    if (errorsArray.length) {
      setErrors(errorsArray);
      return;
    }

    // let cleanImages = images.map((image) => image.file);

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
      address: addressArray[0],
      city: addressArray[1],
      state: addressArray[2],
      country: addressArray[3],
      url1,
      url2,
      url3,
      lat,
      lng,
      user_id: user.id,
      agent_id: agentId,
      // image
    };

    // const listingData = await dispatch(
    //   createListing(
    //     description,
    //     price,
    //     size,
    //     isAvailable,
    //     yearBuilt,
    //     parking,
    //     laundry,
    //     bedrooms,
    //     bathrooms,
    //     addressArray[0],
    //     addressArray[1],
    //     addressArray[2],
    //     addressArray[3],
    //     url1,
    //     url2,
    //     url3,
    //     lat,
    //     lng,
    //     user.id,
    //     agentId,
    //   )
    // )


    // await addImages(cleanImages, listingData[1].id);
    //   window.alert("Successful post.");
    //   history.push("/");
    // };
    await dispatch(createListing(payload));
    history.push("/listings");
    setShow(false);
    // console.log("efnejrger", lat, lng, value)
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

    // const updateImage = (e) => {
    //   const file = e.target.files[0];
    //   console.log("igierjgerg", file)
    //   setImage(file);
    // }

  // ******************

  // const addImages = async (images, listing_id) => {
  //   for (let x = 0; x < images.length; x++) {
  //     const obj = {
  //       file: images[x],
  //       listing_id: listing_id,
  //       newFile: true,
  //     };

  //     await dispatch(uploadFile(obj));
  //   }

  //   // history.push(`/spots/${listing_id}`);
  // };

  return (
    <div>
      <form className="add-listing-form" onSubmit={handleSubmit}>
        <div className="listing-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
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
            ref={ref}
            type="file"
            name="listing image"
            onChange={updateImage}
          /> */}
        <input
          type="text"
          className="add-description-input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();

            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              setLat(lat)
              setLng(lng)
            } catch (error) {
              console.log("error!");
            }
          }}
        >
          <ComboboxInput
            className="search-input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter an address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
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
          <select
            className="agent-names"
            value={agent}
            onChange={(e) => setAgent(agent?.id)}
          >
            {agents.map((agent) => {
              return (
                <option
                  className="agent-options"
                  key={agent?.id}
                  value={agent?.id}
                >
                  {agent?.first_name}
                </option>
              );
            })}
          </select>
        </div>
        <button className="add-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewListing;
