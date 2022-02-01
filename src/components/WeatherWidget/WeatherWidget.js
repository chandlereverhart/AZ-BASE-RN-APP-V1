import React, { useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useTheme, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_KEY } from "../../utils/WeatherAPIKey";
import * as Location from "expo-location";

const Weather = ({ weather, windCondition, temperature }) => {
  const theme = useTheme();

  function convertToF(celsius) {
    return (celsius * 9) / 5 + 32;
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
        </View>
        <View style={styles.bodyContainer}>
          {/* <Text style={styles.title}>{weather}</Text>
           */}
          <Text style={styles.title}>Wind {Math.round(windCondition)} mph</Text>
          <Text style={styles.subtitle}>Gusts 2 mph</Text>
          <MaterialCommunityIcons
            style={styles.title}
            size={48}
            name="navigation"
            color={"#fff"}
          />
        </View>
      </Card>
    </View>
  );
};

export default class WeatherWidget extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    windCondition: 0,
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
          weatherCondition: json.weather[0].main,
          windCondition: json.wind.speed,

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
            weather={this.state.weatherCondition}
            windCondition={this.state.windCondition}
            temperature={this.state.temperature}
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
    backgroundColor: "grey",
    borderRadius: 12,
    borderColor: "lightgrey",
    borderWidth: 1,
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
  bodyContainer: {
    flex: 2,
    justifyContent: "flex-end",
    paddingHorizontal: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
});
