import { fetchApi } from "./fetch";

interface ApiUser {
  id: number;
  name: string;
  username: string;
  password: string;
}

export const postApiLogin = async (body: any) => {
  console.log("body", body);
  const userObj = await fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
  console.log(userObj);
  return ({ accessToken, refreshToken, firstname, id } = userObj);
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
