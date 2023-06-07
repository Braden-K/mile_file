import { fetchApi } from "./fetch";

interface ApiUser {
  id: number;
  name: string;
  username: string;
  password: string;
}

export const getApiUsers = async (): Promise<ApiUser[]> => {
  const users = await fetchApi("/users", { method: "GET" });
  return users;
};

export const getApiUserById = async (id: number): Promise<ApiUser> => {
  const user = await fetchApi(`/users/${id}`, { method: "GET" });
  return user;
};

export const postApiUser = async (body: any) => {
  await fetchApi("/users", {
    method: "POST",
    body: JSON.stringify(body),
  });
};
