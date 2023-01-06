export function return_my_icons(weatherType) {
  console.log(weatherType);
  const my_weather_list = ["Rain", "Clouds", "Clear"];
  //   return my_weather_list.includes(weatherType);
  if (my_weather_list.includes(weatherType)) {
    console.log("i have the icon");
    if (weatherType === "Clouds") {
      return "cloudy.svg";
    }
    if (weatherType === "Clear") {
      return "clear-day.svg";
    }
    if (weatherType === "Rain") {
      return "raindrops.svg";
    }
  } else {
    console.log("i dont have the icon");
    return my_weather_list.includes(weatherType);
  }
  //   console.log(my_weather_list.includes(weatherType));
  //   if (weatherType === "Rain") {
  //     console.log("Let rain show");
  //   }
  //   if (weatherType === "Clouds") {
  //     return "cloudy.svg";
  //   }
}
//  <img src="/images/cloudy.svg" alt="Animated cloudy weather" />
