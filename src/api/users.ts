import { fetchApi } from "./fetch";
interface ApiUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

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
