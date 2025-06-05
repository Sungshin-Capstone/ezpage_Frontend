import { create } from 'zustand';
import tripApi from '../apis/trip';
import dayjs from 'dayjs';

export const useTodayTripIdStore = create((set) => ({
  todayTripId: null,
  setTodayTripId: (id) => set({ todayTripId: id }),

  fetchAndStoreTodayTripId: async () => {
    try {
      const trips = await tripApi.getAllTrips();
      const today = dayjs().format('YYYY-MM-DD');
      const foundTrip = trips.find(
        (trip) => today >= trip.start_date && today <= trip.end_date
      );
      if (foundTrip) {
        set({ todayTripId: foundTrip.id });
      } else {
        set({ todayTripId: null });
      }
    } catch (error) {
      console.error('오늘 여행 ID 불러오기 실패:', error);
      set({ todayTripId: null });
    }
  },
}));