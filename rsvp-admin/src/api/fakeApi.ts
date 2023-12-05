import { User } from "../store/features/userSlice";

export const postLogin = async (
  username: string,
  password: string
): Promise<boolean> => {
  return Promise.resolve(true);
};

export const fetchTgUsers = async (): Promise<User[]> => {
  return Promise.resolve(mockedUsers as User[]);
};

export const markArrived = async (id: number, arrived: boolean) => {
  return Promise.resolve({ id, arrived });
};

const mockedUsers = [
  {
    id: 62,
    language: "FIN",
    name: "Eetu Mönkkönen",
    coming: true,
    avec: false,
    arrived: null,
    created_at: "2023-10-14T17:33:40.396Z",
    updated_at: "2023-10-14T17:33:40.396Z",
    source: "TG",
  },
  {
    id: 36,
    language: "FIN",
    name: "Janne Kallunki",
    coming: true,
    avec: false,
    arrived: null,
    created_at: "2023-10-08T16:31:27.345Z",
    updated_at: "2023-10-08T16:31:27.345Z",
    source: "TG",
  },

  {
    id: 2,
    language: "FIN",
    name: "Janne Kataja",
    coming: true,
    avec: false,
    arrived: true,
    created_at: "2023-10-14T17:33:40.396Z",
    updated_at: "2023-10-14T17:33:40.396Z",
    source: "TG",
  },
  {
    id: 3,
    language: "FIN",
    name: "Elias Lönröth",
    coming: true,
    avec: false,
    arrived: null,
    created_at: "2023-10-08T16:31:27.345Z",
    updated_at: "2023-10-08T16:31:27.345Z",
    source: "TG",
  },

  {
    id: 5,
    language: "FIN",
    name: "Ville Venäja",
    coming: true,
    avec: false,
    arrived: true,
    created_at: "2023-10-14T17:33:40.396Z",
    updated_at: "2023-10-14T17:33:40.396Z",
    source: "TG",
  },
  {
    id: 6,
    language: "FIN",
    name: "Käärijä",
    coming: true,
    avec: false,
    arrived: null,
    created_at: "2023-10-08T16:31:27.345Z",
    updated_at: "2023-10-08T16:31:27.345Z",
    source: "TG",
  },
];
