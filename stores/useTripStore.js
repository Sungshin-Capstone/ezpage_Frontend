import { create } from 'zustand';

export const useTripStore = create((set) => ({
  todayTrip: null,
  setTodayTrip: (trip) => set({ todayTrip: trip }),
}));