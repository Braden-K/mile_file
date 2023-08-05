import { fetchApi } from "./fetch";
interface ApiUser {
  id: number;
  name: string;
  email: string;
}

export const getApiUserById = async (id: number): Promise<ApiUser> => {
  const user = await fetchApi(`/users/${id}`, { method: "GET" });
  return user;
};

export const getApiUserByEmail = async (email: string): Promise<ApiUser> => {
  const user = await fetchApi(`/users/email/${email}`, { method: "GET" });
  return user;
};

export const postApiUser = async (body: any) => {
  await fetchApi("/users", {
    method: "POST",
    body: JSON.stringify(body),
    contentType: "application/json",
  });
};
