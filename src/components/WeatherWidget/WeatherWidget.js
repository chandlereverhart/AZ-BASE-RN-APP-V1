import React, { useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useTheme, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_KEY } from "../../utils/WeatherAPIKey";
import * as Location from "expo-location";

const Weather = ({
  weather,
  sunrise,
  sunset,
  windSpeed,
  windGusts,
  direction,
  temperature,
}) => {
  const theme = useTheme();

  function convertToF(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  function getTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();

    var formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  }

  convertToF(30);
  return (
    <View style={styles.weatherContainer}>
      <Card style={styles.weatherCard}>
        <View style={styles.headerContainer}>
          <Text style={styles.tempText}>
            {Math.round(convertToF(temperature))}˚
          </Text>
          <Text style={styles.subtitle}>Superstition Mountain</Text>
          <View style={styles.sunTimes}>
            <View style={styles.sunrise}>
              <MaterialCommunityIcons
                style={styles.sunIcon}
                size={35}
                name="weather-sunny"
                color={"#fff"}
              />
              <Text style={styles.sunText}>: {getTime(sunrise)} </Text>
            </View>
            <View style={styles.sunset}>
              <MaterialCommunityIcons
                style={styles.sunIcon}
                size={30}
                name="weather-night"
                color={"#fff"}
              />
              <Text style={styles.sunText}>: {getTime(sunset - 43200)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>Wind {Math.round(windSpeed + 2)} mph</Text>
          <Text style={styles.subtitle}>
            Gusts {Math.round(windGusts + 3)} mph
          </Text>
          <View>
            <MaterialCommunityIcons
              style={styles.windIcon}
              style={{
                transform: [{ rotateZ: `${direction + 180}deg` }],
                position: "absolute",
                left: "42%",
              }}
              size={48}
              name="navigation"
              color={"#fff"}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default class WeatherWidget extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    windSpeed: 0,
    windGusts: 0,
    direction: 0,
    sunrise: 0,
    sunset: 0,
    weatherCondition: null,
    error: null,
    lat: 33.44851,
    lng: -111.47684,
  };

  componentDidMount() {
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        this.setState({
          error: "Error Gettig Weather Condtions",
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          sunrise: json.sys.sunrise,
          sunset: json.sys.sunset,
          weatherCondition: json.weather[0].main,
          windSpeed: json.wind.speed,
          windGusts: json.wind.gust,
          direction: json.wind.deg,

          isLoading: false,
        });
      });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching The Weather</Text>
        ) : (
          <Weather
            temperature={this.state.temperature}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}
            weather={this.state.weatherCondition}
            windSpeed={this.state.windSpeed}
            windGusts={this.state.windGusts}
            direction={this.state.direction}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  weatherCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tempText: {
    fontSize: 48,
    color: "#fff",
    textAlign: "center",
  },
  sunTimes: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  sunrise: {
    display: "flex",
    flexDirection: "row",
    marginRight: 5,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  sunset: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 5,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  sunText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  bodyContainer: {
    flex: 2,
    justifyContent: "flex-end",
    paddingHorizontal: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  windIcon: {
    display: "flex",
    textAlign: "center",
    marginBottom: 50,
  },
});
