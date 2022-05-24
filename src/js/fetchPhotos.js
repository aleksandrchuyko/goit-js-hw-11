const axios = require('axios').default;
const options = {
    key: '27605426-0fda2c4b0cfa268906a19ec96'
}
const url = "https://pixabay.com/api/";
export const fetchPhotos = async function (params) {
  try {
    console.log({ params });
      const response = await axios.get(url, {
        params
      });
    return response;
  } catch (error) {
    console.error(error);
  }
}
