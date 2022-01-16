import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Button, Card, CardContent, Grid, makeStyles, Input } from "@material-ui/core";
import Autocomplete from "../../../components/Autocomplete";
import { countries } from "../../../helpers/constants";
import { getCityWeather } from "./../../../redux/actions/city_actions";
import { validateCityGeneralForm } from "./../../../validation/validators";
import { City } from 'country-state-city';
import Geocode from "react-geocode";

const useStyles = makeStyles((theme) => ({
  root: {},
  grid: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  gridItem: {
    marginLeft: "10px",
  },
}));

const Toolbar = ({ className, ...rest }) => {
  //Const
  const classes = useStyles();
  const dispatch = useDispatch();

  //Local States
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({ name: "" });
  const [country, setCountry] = useState({ code: "", name: "", currecy: "" });
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");



  //Cities From Reducer to check if the city already exist
  const perviousCities = useSelector((store) => store.cityReducer.cities);


  React.useEffect(() => {
    Geocode.setApiKey("AIzaSyCyl7x1C-B8ZK_qa7tRAP4JEjryDjqepvE");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
  })
  //Handlers
  const handleCountrySelection = (e, v) => {
    if (v && v.code) {
      e.preventDefault();
      const res = City.getCitiesOfCountry(v.code).map((val) => ({ name: val.name }));
      setCity({ name: "" });
      setCountry({ code: v.code, name: v.name, currency: v.currency })

      if (res) {
        setCities(res);
      }
    } else {
      setCities([]);
    }
  };

  const handleCitySelection = (e, v) => {
    if (v) {
      e.preventDefault();
      setCity({ name: v.name });
    } else {
      setCity({ name: "" });
    }
  };

  const handleAddCity = async () => {
    if (!validateCityGeneralForm(city)) {
      //Dispatch Add City Action
      await dispatch(getCityWeather(perviousCities, city.name, country.currency));
    }
  };


  const findLocation = () => {
    Geocode.fromLatLng(lat, long).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
    
    // Get latitude & longitude from address.
    Geocode.fromAddress("Eiffel Tower").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );

  }
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardContent>
          <Grid container className={classes.grid}>
            <Grid xs={3}>
              <Autocomplete
                data={countries}
                label="Select Your Country!"
                onChange={handleCountrySelection}
              />
            </Grid>
            <Grid xs={3} className={classes.gridItem}>
              <Autocomplete
                value={city}
                data={cities}
                name="city"
                label="Select Your City!"
                onChange={handleCitySelection}
              />
            </Grid>
            <Grid xs={3} className={classes.gridItem}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleAddCity}
              >
                Add city!
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        <CardContent>
          <Grid container className={classes.grid}>
            <Grid xs={3}>
              <Input id="my-input" aria-describedby="my-helper-text" value={lat} onChange={(e) => setlat(e.target.value)} />

            </Grid>
            <Grid xs={3} className={classes.gridItem}>
              <Input value={long} id="my-input" onChange={(e) => setlong(e.target.value)} aria-describedby="my-helper-text" />

            </Grid>
            <Grid xs={3} className={classes.gridItem}>
              <Button
                color="primary"
                variant="contained"
                onClick={findLocation}
              >
                Find
              </Button>
            </Grid>
          </Grid>
        </CardContent>

      </Card>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
