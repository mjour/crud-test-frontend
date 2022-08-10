import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { ENUM } from "./enum";

export const cookiesFromHead = async (response: Response) => {

  if (response.status > 399 && response.status < 406) {
    const errObj = { error: true, message: 'invalid_token' };
    throw errObj;
  }

  try {
    const access_token = response.headers.get(ENUM.ACCESS_TOKEN);
    const refresh_token = response.headers.get(ENUM.REFRESH_TOKEN);
    if (access_token) {
      Cookies.set(ENUM.ACCESS_TOKEN, access_token, { expires: 1 / 96 });
    }
    if (refresh_token) {
      Cookies.set(ENUM.REFRESH_TOKEN, refresh_token, { expires: 15 });
    }
  } catch (error) {
    removeAuth();
  }
}

export const removeAuth = () => {
  Cookies.remove(ENUM.ACCESS_TOKEN);
  Cookies.remove(ENUM.REFRESH_TOKEN);
  window.location.href = '/login';
}

export const goodToken = async () => {
  try {
    const token = Cookies.get();
    const access_token = token[ENUM.ACCESS_TOKEN];
    const refresh_token = token[ENUM.REFRESH_TOKEN];
    if (!refresh_token) {
      return false;
    }
    let expired = true;
    if (access_token) {
      expired = Date.now() >= (jwtDecode<any>(access_token).exp * 1000);
    }
    if (expired) {
      let response = await fetch(ENUM.GRAPH_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        }
        , body: JSON.stringify({ query: `{accessToken}` })
      });
      await cookiesFromHead(response);
      const data = await response.json();
      if (data.errors) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
}