import { create } from "zustand";
import { persist } from "zustand/middleware";



type AuthTokenStore = {
    token: string;
    setToken: (token: string) => void;
}

const useAuthTokenStore = create<AuthTokenStore>()(
    persist((set) => {
        return {
            token: "",
            setToken: (token: string) => {
                set({ token })
            }
        }
    }, {
        name: "auth-token"
    })
)

export  {useAuthTokenStore}