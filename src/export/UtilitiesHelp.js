export function return_my_icons(weatherType) {
  const my_weather_list = ["Rain", "Clouds", "Clear"];
  if (my_weather_list.includes(weatherType)) {
    switch (weatherType) {
      case "Clouds":
        return "cloudy.svg";

        break;
      case "Clear":
        return "clear-day.svg";
        break;
      case "Rain":
        return "raindrops.svg";

      case "Snow":
        return "snowflake.svg";
        break;

      case "Mist":
        return "mist.svg";
        break;

      case "":
        return "overcast-day.svg";
    }
  } else {
    console.log("i dont have the icon");
    return my_weather_list.includes(weatherType);
  }
}
