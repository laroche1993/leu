import axios, { Axios } from "axios";

export const axiosClient = new Axios({
  baseURL: "https://inmigrarhoy.com",
  responseType: 'json'
});

export const getPosts = async () => {
  return (
    await axiosClient.get(
      "/wp-json/wp/v2/posts/?_embed&_fields=id,excerpt,title,link, status, featuredmedia"
    )
  ).data;
};
