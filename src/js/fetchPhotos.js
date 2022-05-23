const axios = require('axios').default;
const options = {
    key: '27605426-0fda2c4b0cfa268906a19ec96'
}
const url = "https://pixabay.com/api/";
export const fetchPhotos = async function (params) {
    // return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    //     .then((response) => {
    //         if (response.ok) {
    //             return response.json();
    //         } else throw new Error('Oops, there is no country with that name');
    //     });
  try {
    console.log({ params });
      const response = await axios.get(url, {
        params
      });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
