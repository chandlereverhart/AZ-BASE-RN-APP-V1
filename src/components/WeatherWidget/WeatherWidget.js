import React, { useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_KEY } from "../../utils/WeatherAPIKey";
import * as Location from "expo-location";

const Weather = () => {
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons size={48} name="weather-sunny" color={"#fff"} />
        <Text style={styles.tempText}>Temperature˚</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>So Sunny</Text>
        <Text style={styles.subtitle}>It hurts my eyes!</Text>
      </View>
    </View>
  );
};

export default class WeatherWidget extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null,
  };

  componentDidMount() {
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
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
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <Text>Fetching The Weather</Text> : <Weather />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  weatherContainer: {
    flex: 1,
    backgroundColor: "#f7b733",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tempText: {
    fontSize: 48,
    color: "#fff",
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});
