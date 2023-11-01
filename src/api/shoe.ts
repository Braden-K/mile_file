import { fetchApi } from "./fetch";
import { Shoe } from "../models/Shoe";

export const getApiShoesByUserId = async (user_id: number): Promise<Shoe[]> => {
  const shoes = await fetchApi(`/shoes/${user_id}`, { method: "GET" });
  return shoes;
};

export const postApiShoe = async (user_id: number, body: any) => {
  console.log(JSON.stringify(body));
  await fetchApi(`/shoes/${user_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const putApiShoe = async (shoe_id: number, body: any) => {
  console.log("Put apoi shoe id", shoe_id);
  console.log("body", body);
  await fetchApi(`/shoes/${shoe_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
