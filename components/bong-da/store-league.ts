import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MatchProps {
  data: League[];
  pinnedLeague: (league: League) => void;
  removeLeague: (id: string) => void;
}

const useMatchStore = create<MatchProps>()(
  persist(
    (set) => {
      return {
        data: [],
        pinnedLeague: (league: League) => {
          set((state) => ({
            data: [...state.data, league],
          }));
        },
        removeLeague: (id: string) => {
          set((state) => ({
            data: state.data.filter((league) => league.leagueId !== id),
          }));
        },
      };
    },
    {
      name: "leagues_pinned",
      partialize: (state) => ({
        leagues_pinned: state.data,
      }),
    }
  )
);

export default useMatchStore;
