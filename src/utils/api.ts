import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const IMDB_TOKEN = process.env.NEXT_PUBLIC_IMDB_TOKEN;

export const fetchDataFromApi = async (url: string, params: any) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: {
        Authorization: `Bearer ${IMDB_TOKEN}`,
      },
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
