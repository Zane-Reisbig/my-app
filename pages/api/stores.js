import { create } from 'zustand'

export const useFileStorage = create((set) => ({
  fileData: {},
  setFileData: (fileData) => set({ fileData }),
}))



