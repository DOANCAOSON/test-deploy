import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISearchState {
  searchResults: Team[];
  isOpenSearchLeague: boolean;
  setIsOpenSearchLeague: (val: boolean) => void;
  addToSearchResults: (item: Team) => void;
  removeFromSearchResults: (teamId: string) => void;
}

const useSearchResultsStore = create<ISearchState>()(
  persist(
    (set) => ({
      searchResults: [],
      isOpenSearchLeague: false,
      setIsOpenSearchLeague: (val: boolean) =>
        set(() => ({ isOpenSearchLeague: val })),
      addToSearchResults: (item: Team) => {
        set((state) => ({
          searchResults: [...state.searchResults, item],
        }));
      },
      removeFromSearchResults: (teamId: string) => {
        set((state) => ({
          searchResults: state.searchResults.filter(
            (_item) => _item.teamId !== teamId
          ),
        }));
      },
    }),
    {
      name: "my_teams",
      partialize: (state) => ({ searchResults: state.searchResults }),
    }
  )
);

export default useSearchResultsStore;
