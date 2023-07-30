import { fetchApi } from "./fetch";

interface ApiUser {
  id: number;
  name: string;
  username: string;
  password: string;
}

export const postApiLogin = async (body: any) => {
  const { accessToken, refreshToken } = await fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return { accessToken, refreshToken };
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
