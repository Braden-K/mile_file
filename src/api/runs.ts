import { fetchApi } from "./fetch";
import { Run } from "../models/Run";
import { getApiShoesByUserId, putApiShoe } from "./shoe";

export const getApiRunsByUserId = async (user_id: number): Promise<Run[]> => {
  const runs = await fetchApi(`/runs/user/${user_id}`, { method: "GET" });
  return runs;
};

export const getApiRunById = async (id: number): Promise<Run> => {
  const run = await fetchApi(`/runs/${id}`, { method: "GET" });
  return run;
};

export const postApiRun = async (id: number, body: any) => {
  console.log(JSON.stringify(body));
  await fetchApi(`/runs/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const putApiRun = async (id: number, body: any) => {
  await fetchApi(`/runs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const putApiRunNotes = async (id: number, body: any) => {
  await fetchApi(`/runs/${id}/notes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const deleteApiRun = async (id: number) => {
  await fetchApi(`/runs/${id}`, { method: "DELETE" });
};
