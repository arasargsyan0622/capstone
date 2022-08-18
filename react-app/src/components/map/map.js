import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import { formatRelative } from "date-fns";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import "./map.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListings } from "../../store/listing";

const mapContainerStyle = {
  width: "98vw",
  height: "98vh",
};
const center = {
  lat: 34,
  lng: 241.7,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  Geocode.setApiKey("AIzaSyCD4HqDWtcp8kz09do8TUk0_CR0TJjCZcY");

  const dispatch = useDispatch();
  const history = useHistory();
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const session = useSelector((state) => state.session);
  const listings = Object.values(useSelector((state) => state.listings));

  let address;
  let country;
  let city;
  let state;
  let fullAddress;
  let latit;
  let longit;

  listings.map((listing) => {
    address = listing?.address;
    country = listing?.country;
    city = listing?.city;
    state = listing?.state;
    latit = listing?.lat;
    longit = listing?.lng;
    fullAddress = address
      .concat(", ", city)
      .concat(", ", state)
      .concat(", ", country)
      .concat();
  });

  useEffect(() => {
    if (!session.user) {
      history.push("/login");
    }
    //
    dispatch(getListings());
  }, [dispatch]);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  return (
    <div>
      {/* <h1>Listings{" "}
                <span role="img" aria-label="house">
                    🏠
                </span>
            </h1> */}

      <Search panTo={panTo} />
      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {listings.map((listing) => (
          <Marker
            // key={marker.time.toISOString}
            position={{ lat: listing?.lat, lng: listing?.lng }}
            icon={ listing?.is_available == true ? { url: "/go-home.svg", scaledSize: new window.google.maps.Size(27, 27) } :
                 { url: "/not-a.svg", scaledSize: new window.google.maps.Size(27, 27) }}

            // onClick={() => {
            //   setClick(!click);
            // }}a
          />
        ))}
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: 37.778519, lng: -122.405640}} />
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>Listing</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          () => null
        );
      }}
    >
      <img
        className="locate"
        src="https://cdn.shopify.com/s/files/1/0502/4697/5681/files/Compass_Logo_black_664x.jpg?v=1617594215"
      />
    </button>
  );
}

export function Search({ panTo }) {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => lat, lng: () => long },
      radius: 200 * 1000,
    },
  });

  return (
    <div>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            // console.log("converting address to lat lng", { lat, lng });
          } catch (error) {
            console.log("error!");
          }
        }}
      >
        <ComboboxInput
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
    </div>
  );
}
