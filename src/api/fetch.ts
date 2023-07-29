const baseURL = "http://localhost:5000";

export const fetchApi = async (url: string, options: any) => {
  try {
    const response = await fetch(baseURL.concat(url), options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
