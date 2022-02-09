import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_KEY } from "../../utils/WeatherAPIKey";
import * as Location from "expo-location";

const Weather = ({
  sunrise,
  sunset,
  windSpeed,
  windGusts,
  direction,
  temperature,
  hourly,
  currentTime,
}) => {
  function convertToF(celsius) {
    return (celsius * 9) / 5 + 32;
  }
  // Time Handlers
  function getTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  }
  function getHourlyTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var getHours = date.getHours();

    var hours = getHours >= 12 ? getHours - 12 : getHours;
    if (hours === 0) {
      hours = 12;
    }
    var formattedTime = `${hours}`;
    return formattedTime;
  }
  function getAmPm(timestamp) {
    var date = new Date(timestamp * 1000);
    var getHours = date.getHours();
    if (getHours === 0) {
      getHours = 12;
    }
    var formattedTime = `${getHours >= 12 ? "pm" : "am"} `;
    return formattedTime;
  }

  const TABLE_HEAD = [
    {
      label: getHourlyTime(currentTime + 3600) + getAmPm(currentTime + 3600),
    },
    {
      label: getHourlyTime(currentTime + 7200) + getAmPm(currentTime + 7200),
    },
    {
      label: getHourlyTime(currentTime + 10800) + getAmPm(currentTime + 10800),
    },
    {
      label: getHourlyTime(currentTime + 14400) + getAmPm(currentTime + 14400),
    },
    {
      label: getHourlyTime(currentTime + 18000) + getAmPm(currentTime + 18000),
    },
  ];

  const weatherComment =
    windGusts * 2.2 < 6 && windSpeed * 2.2 < 6 ? "It's Good." : "Ehhhhh...";

  const HourlyItem = (item) => {
    return (
      <>
        <View style={styles.column}>
          <Text style={styles.pmText}>{TABLE_HEAD[item.index].label}</Text>
          <Text style={styles.hourlyText}>
            {Math.round(item.item.wind_speed * 2.2)}
          </Text>
          <Text style={styles.hourlyText}>
            {Math.round(item.item.wind_gust * 2.2)}
          </Text>
          <View>
            <MaterialCommunityIcons
              style={styles.hourlyWindIcon}
              style={{
                transform: [
                  {
                    rotateZ: `${item.item.wind_deg + 180}deg`,
                  },
                ],
                position: "absolute",
                marginLeft: 10,
              }}
              size={16}
              name="navigation"
              color={"rgba(255, 255, 255, 0.9)"}
            />
          </View>
        </View>
        {item.index !== 4 && <View style={styles.verticleLine}></View>}
      </>
    );
  };

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
          <View style={styles.commentView}>
            <Text style={styles.commentText}>{weatherComment}</Text>
          </View>
        </View>

        <View style={styles.hourlyContainer}>
          <View style={styles.hourlyColumns}>
            {hourly.map((item, index) => {
              return <HourlyItem item={item} index={index} key={index} />;
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
    hourly: [],
    currentTime: null,
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
        this.setState({
          temperature: json.current.temp,
          sunrise: json.current.sunrise,
          sunset: json.current.sunset,
          weatherCondition: json.current.weather[0].main,
          windSpeed: json.current.wind_speed,
          windGusts: json.current.wind_gust,
          direction: json.current.wind_deg,
          hourly: json.hourly.slice(0, 5),
          currentTime: json.current.dt,
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
            hourly={this.state.hourly}
            currentTime={this.state.currentTime}
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
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  hourlyContainer: {
    flex: 1,
  },

  hourlyColumns: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
  verticleLine: {
    height: "130%",
    width: 0.5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginRight: 4,
  },
  pmText: {
    color: "white",
    fontSize: 16,
  },
  hourlyText: {
    color: "white",
    fontSize: 16,
    marginLeft: "25%",
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
  commentText: {
    marginTop: 10,
    fontSize: 32,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
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
