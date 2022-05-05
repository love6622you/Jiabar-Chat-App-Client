import { GetState, SetState } from "zustand";
import { RootState } from "./index";

export interface AuthSlice {
  token: string;
  personal: object;
  setPersistedAuth: any;
  clearPersistedAuth: any;
  getUserName: any;
}

const createAuthSlice = (
  set: SetState<any>,
  get: GetState<any>
  // set: SetState<RootState>,
  // get: GetState<RootState>
) => ({
  token: "",
  personal: {},
  setPersistedAuth: (token, userInfo) =>
    set(() => ({
      token: token,
      personal: { ...userInfo }
    })),
  clearPersistedAuth: () =>
    set(() => ({
      token: "",
      personal: {}
    })),
  getUserName: () => {
    const firstName = get().personal["firstName"];
    const lastName = get().personal["lastName"];
    return `${firstName}${lastName}`;
  }
});

export default createAuthSlice;
