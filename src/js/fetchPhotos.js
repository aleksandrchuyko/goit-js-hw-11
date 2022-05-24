const axios = require('axios').default;

const url = "https://pixabay.com/api/";
export const fetchPhotos = async function (params) {
  try {
        const response = await axios.get(url, {
        params
      });
    return response;
  } catch (error) {
    console.error(error);
  }
}
