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
  const TABLE_HEAD = [
    {
      label: "Now",
    },
    {
      label: "1hr",
    },
    {
      label: "2hr",
    },
    {
      label: "3hr",
    },
    {
      label: "4hr",
    },
    {
      label: "5hr",
    },
  ];

  const hourly = [
    {
      wind_deg: 164,
      wind_gust: 5,
      wind_speed: 3,
    },
    {
      wind_deg: 64,
      wind_gust: 7,
      wind_speed: 4,
    },
    {
      wind_deg: 24,
      wind_gust: 9,
      wind_speed: 5,
    },
    {
      wind_deg: 234,
      wind_gust: 4,
      wind_speed: 1,
    },
    {
      wind_deg: 24,
      wind_gust: 9,
      wind_speed: 5,
    },
    {
      wind_deg: 234,
      wind_gust: 4,
      wind_speed: 1,
    },
  ];

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
                color={"rgba(255, 255, 255, 0.8)"}
              />
              <Text style={styles.sunText}>: {getTime(sunrise)} </Text>
            </View>
            <View style={styles.sunset}>
              <MaterialCommunityIcons
                style={styles.sunIcon}
                size={30}
                name="weather-night"
                color={"rgba(255, 255, 255, 0.8)"}
              />
              <Text style={styles.sunText}>: {getTime(sunset - 43200)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.hourlyContainer}>
          <View style={styles.hourlyColumns}>
            {hourly.map((item, index) => {
              return (
                <>
                  <View style={styles.column}>
                    <Text style={styles.hourlyText}>
                      {TABLE_HEAD[index].label}
                    </Text>

                    <Text style={styles.hourlyText}>{item.wind_speed}</Text>
                    <Text style={styles.hourlyText}>{item.wind_gust}</Text>
                    <View>
                      <MaterialCommunityIcons
                        style={styles.hourlyWindIcon}
                        style={{
                          transform: [{ rotateZ: `${item.wind_deg + 180}deg` }],
                          position: "absolute",
                        }}
                        size={10}
                        name="navigation"
                        color={"rgba(255, 255, 255, 0.9)"}
                      />
                    </View>
                  </View>
                </>
              );
            })}
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>
              Wind {Math.round(windSpeed * 2.2)} mph
            </Text>
            <Text style={styles.subtitle}>
              Gusts {Math.round(windGusts * 2.2)} mph
            </Text>
            <View>
              <MaterialCommunityIcons
                style={styles.windIcon}
                style={{
                  transform: [{ rotateZ: `${direction + 180}deg` }],
                  position: "absolute",
                  left: "36%",
                }}
                size={48}
                name="navigation"
                color={"rgba(255, 255, 255, 0.8)"}
              />
            </View>
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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lng}&exclude=minutely&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          temperature: json.current.temp,
          sunrise: json.current.sunrise,
          sunset: json.current.sunset,
          weatherCondition: json.current.weather[0].main,
          windSpeed: json.current.wind_speed,
          windGusts: json.current.wind_gust,
          direction: json.current.wind_deg,

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
    borderColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hourlyContainer: {
    flex: 1,
    marginTop: 30,
  },
  hourlyCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 30,
  },
  hourlyColumns: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    flex: 1,
    borderRightColor: "rgba(255, 255, 255, 0.8)",
    borderRightWidth: 1,
  },
  hourlyText: {
    color: "white",
  },
  hourlyWindIcon: {
    display: "flex",
    textAlign: "center",
  },
  tempText: {
    fontSize: 48,
    color: "rgba(255, 255, 255, 0.8)",
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
    color: "rgba(255, 255, 255, 0.8)",
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
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
  },

  windIcon: {
    display: "flex",
    textAlign: "center",
    marginBottom: 50,
  },
});
