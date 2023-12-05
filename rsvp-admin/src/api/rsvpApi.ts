import axios from "axios";
import { Source } from "../store/features/userSlice";

export const postLogin = async (username: string, password: string) => {
  const response = await axios.post("http://localhost:8080/login", {
    username,
    password,
  });
  if (!response.data.token) throw new Error("Login failed");
  return response.data;
};

export const fetchRSVPUsers = async (token: string) => {
  try {
    console.log("fetchRSVPUsers");
    const response = await axios.get("http://localhost:8080/api/getComing", {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markArrived = async (
  id: number,
  arrived: boolean,
  source: Source,
  token: string
) => {
  try {
    console.log("markArrived", token);

    const response = await axios.post(
      "http://localhost:8080/api/markArrived",
      {
        id,
        arrived,
        source,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postMessage = async (
  message: string,
  passphrase: string,
  token: string
) => {
  try {
    console.log("postMessage", token);

    const parsemsg = message.split("\n");

    console.log("what", parsemsg);

    const response = await axios.post(
      "http://localhost:8080/api/sendMessage",
      {
        message: parsemsg,
        passphrase,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response.data);
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const fetchEmails = async (token: string) => {
  try {
    console.log("fetchEmails");
    const response = await axios.get("http://localhost:8080/api/formsEmails", {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
