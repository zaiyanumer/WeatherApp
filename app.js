const getWeather = async (city) => {
  if (typeof (city) !== "number" || city) {
    document.querySelector("#cityName").innerHTML = city;
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '025c34d9aamsh076a5b95444e776p1833eajsncd85b08fc45e',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
    };

    (async function () {
      try {
        const response = await fetch(url, options);
        if (response.status != 400) {
          const result = await response.json();

          document.querySelector("#temp").innerHTML = result.temp;
          document.querySelector("#feels_like").innerHTML = result.feels_like;
          document.querySelector("#humidity").innerHTML = result.humidity;
          document.querySelector("#wind_speed").innerHTML = result.wind_speed;
          document.querySelector("#sunrise").innerHTML = convertUnixTimestamp(result.sunrise);
          document.querySelector("#sunset").innerHTML = convertUnixTimestamp(result.sunset);
        } else {
          Swal.fire({
            icon: "error",
            title: `Something went wrong! `
            ,
            text: "Please Ensure that the Spelling is Correct"
          });

        }
      } catch (error) {
        console.error(error);
      }
    })();
  }
};
getWeather("Karachi")

document.querySelector("#submitBtn").addEventListener("click", (e) => {
  e.preventDefault();
  let searchBox = document.querySelector("#searchBox");
  let searchBoxValue = searchBox.value.charAt(0).toUpperCase() + searchBox.value.slice(1);
  getWeather(searchBoxValue);
  searchBox.value = "";
})



function convertUnixTimestamp(unixTimestamp) {
  // Convert Unix timestamp to milliseconds
  let unixTimestampInMilliseconds = unixTimestamp * 1000;

  // Create a Date object
  let dateObject = new Date(unixTimestampInMilliseconds);

  // Extract hours and minutes
  let hours = dateObject.getHours();
  let minutes = dateObject.getMinutes();

  // Convert to 12-hour format
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0:00) as 12 AM

  // Pad single-digit minutes with a leading zero
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Form the time string in 12-hour format
  let formattedTime = hours + ':' + minutes + ' ' + ampm;

  return formattedTime;
}
