import create, { GetState, Mutate, SetState, StoreApi } from "zustand";
import { persist } from "zustand/middleware";

import createUserSlice, { UserSlice } from "./createUserSlice";
import createAuthSlice, { AuthSlice } from "./createAuthSlice";

export type RootState = UserSlice & AuthSlice;

// 假設有其它狀態也需要被 persist 的話，直接 union 其它 status
type persistStoreApiType = ReturnType<typeof createAuthSlice>;

// const useStore = create<RootState>((set, get) => ({
const createRootSlice = (
  set: SetState<any>,
  get: GetState<any>,
  api: Mutate<
    StoreApi<persistStoreApiType>,
    [["zustand/persist", Partial<persistStoreApiType>]]
  >
) => {
  return {
    ...createUserSlice(set, get),
    ...persist(createAuthSlice, {
      name: "auth"
    })(set, get, api)
  };
};

export const useStore = create(createRootSlice);
