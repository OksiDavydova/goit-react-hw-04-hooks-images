import axios from "axios";

let KEY = "23071441-390664cd2415d23736c9d0a4e";
axios.defaults.baseURL = "https://pixabay.com/api/";

const fetchPictures = (query, page) => {
  return axios
    .get(
      `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => {
      if (response) {
        // console.log(response.data);
        return response.data.hits;
      }
    });
};

export default fetchPictures;
