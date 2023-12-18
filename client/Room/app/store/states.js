
import { create } from "zustand";

export const useSocketStore = create((set)=>({
    socket:null,
    setSocket: (socket)=>set({socket})
}))


export const useRoomStore = create((set)=>({
    currentroom:"",
    setCurrentroom:(currentroom)=>set({currentroom})
}))