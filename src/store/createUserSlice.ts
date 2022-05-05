import { GetState, SetState } from "zustand";
import { RootState } from "./index";

type UserData = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
};

export interface UserSlice {
  allFriends: Array<UserData>;
  setAllUsers: any;
  getFriendName: any;
}

const createUserSlice = (
  set: SetState<any>,
  get: GetState<any>
  //   set: SetState<RootState>,
  //   get: GetState<RootState>
) => ({
  allFriends: [],
  setAllFriends: (data) =>
    set(() => ({
      allFriends: data
    })),
  getFriendName: (id) => {
    const target = get().allFriends?.find((item) => {
      return item.id === id;
    });

    return `${target.firstName}${target.lastName}`;
  }
});

export default createUserSlice;
