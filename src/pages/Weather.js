import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useGetWeatherByNameQuery } from '../redux/weather/weatherSlice';

const useStyles = makeStyles({
  field: {
    marginBottom: 10,
    display: 'block',
  },
});

export default function Weather() {
  const classes = useStyles();
  const [city, setCity] = useState('');
  const { data, error, isFetching, isError } = useGetWeatherByNameQuery(city, {
    skip: city === '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    setCity(e.currentTarget.citySearch.value);
    e.currentTarget.reset();
  };

  const showNotFoundError = isError && error.status === 404;
  const showPokemonData = data && !isFetching && !isError;
  const weatherIcon = data.weather[0].icon;

  return (
    <Container>
      {isFetching && (
        <Loader
          className="Loader"
          type="Puff"
          color="blue"
          height={100}
          width={100}
        />
      )}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label="Search"
          name="citySearch"
          type="text"
          variant="standard"
          color="secondary"
          // fullWidth
          helperText="Type a city name"
        />
        <Button
          type="submit"
          disabled={isFetching}
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          {isFetching && (
            <Loader
              className="Loader"
              type="ThreeDots"
              color="blue"
              height={20}
              width={24}
            />
          )}
          Find
        </Button>
      </form>

      {showNotFoundError && (
        <h2>
          Whoops, no city with the <i>{city}</i> name found! 😢
        </h2>
      )}

      {showPokemonData && (
        <div className="weatherCard">
          <h1>Here's weather for {data.name}</h1>
          <img
            className="weatherIcon"
            src={`https://openweathermap.org/img/w/${weatherIcon}.png`}
            alt="weather icon"
          />
          <p>Forecast: {data.weather[0].main}</p>
          <p>Temperature: {Math.round(data.main.temp - 273.15)} °C</p>
          <p>Humidity: {data.main.humidity}</p>
          <p>Wind Speed: {data.wind.speed} km/h</p>
          <p>
            Sunrise:{' '}
            {new Date(data.sys.sunrise * 1000).toLocaleTimeString('ru-RU')}
          </p>
          <p>
            Sunset:{' '}
            {new Date(data.sys.sunset * 1000).toLocaleTimeString('ru-RU')}
          </p>
        </div>
      )}
    </Container>
  );
}