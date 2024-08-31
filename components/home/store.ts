import {
  getMatches,
  getMatchesListLive,
  getTeamScheduleList,
} from "@/services/sport";
import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const mapMatches = (data: Match[], key: keyof Match) => {
  const map = data.reduce((acc: any, match) => {
    acc[match[key] as string] = acc[match[key] as string] || {
      ...match,
      matches: [],
    };

    acc[match[key] as string].matches.push({
      matchId: match.matchId,
      matchAt: match.matchAt,
      homeName: match.homeName,
      homeLogo: match.homeLogo,
      awayName: match.awayName,
      awayLogo: match.awayLogo,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      homeHalfScore: match.homeHalfScore,
      awayHalfScore: match.awayHalfScore,
      homeRed: match.homeRed,
      awayRed: match.awayRed,
      homeYellow: match.homeYellow,
      awayYellow: match.awayYellow,
      homeCorner: match.homeCorner,
      hasLive: match.hasLive,
      awayCorner: match.awayCorner,
      status: match.status,
      matchTime: match.matchTime,
      explain: match.explain,
      injuryTime: match.injuryTime,
      hasLineup: match.hasLineup,
      tips: match.tips,
    });

    return acc;
  }, {});

  return Object.values(map).sort((a: any, b: any) => b.status - a.status);
};

export const handleConvertData = (data: Match[]) => {
  return mapMatches(data, "leagueId");
};

export const handleConvertRound = (data: Match[]) => {
  return mapMatches(data, "round");
};

interface HomeProps {
  activeTab: string;
  favoriteMatches: string[];
  favoriteLeagues: string[];
  date: string;
  setActiveTab: (tab: string) => void;
  data: Tournament[] | null;
  loading: boolean;
  fetchMatches: () => void;
  fetchMatchesLive: () => void;
  fetchMatchesList: () => void;
  getMatchesYesterday: () => void;
  getMatchesLive: () => void;
  addFavoriteMatch: (matchId: string) => void;
  removeFavoriteMatch: (matchId: string) => void;
  addFavoriteLeague: (leagueId: string, matchIds: string[]) => void;
  removeFavoriteLeague: (leagueId: string, matchIds: string[]) => void;
  fetchMatchesByDate: (date: string) => void;
}

const createFetchMatches = (set: any, fetchFunction: any) => async () => {
  set({ loading: true });
  try {
    const response = await fetchFunction();
    const convertedData = handleConvertData(response.data) as Tournament[];
    set({ data: convertedData, loading: false });
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    set({ loading: false });
  }
};

const params = [
  { path: ["/quan-tam"], tab: "time" },
  { path: ["/"], tab: "all" },
];

const useHomeStore = create<HomeProps>()(
  persist(
    (set, get) => {
      const path =
        typeof location !== "undefined"
          ? params.find((p) => p.path.includes(location?.pathname))
          : params[1];
      return {
        activeTab: path?.tab ?? "all",
        favoriteMatches: [],
        favoriteLeagues: [],
        date: dayjs().toISOString(),
        data: null,
        loading: true,
        setActiveTab: (tab: string) => set({ activeTab: tab }),
        fetchMatches: createFetchMatches(set, () => getMatches(get().date)),
        fetchMatchesLive: createFetchMatches(set, getMatchesListLive),
        fetchMatchesList: createFetchMatches(set, () =>
          get().favoriteMatches.length
            ? getTeamScheduleList(get().favoriteMatches)
            : set({ data: [] })
        ),
        addFavoriteMatch: (matchId: string) => {
          set((state) => ({
            favoriteMatches: [...state.favoriteMatches, matchId],
          }));
        },
        removeFavoriteMatch: (id: string) => {
          set((state) => ({
            favoriteMatches: state.favoriteMatches.filter(
              (matchId) => matchId !== id
            ),
          }));
        },
        addFavoriteLeague: (leagueId: string, matchIds: string[]) => {
          set((state) => ({
            favoriteLeagues: [...state.favoriteLeagues, leagueId],
            favoriteMatches: [...state.favoriteMatches, ...matchIds],
          }));
        },
        removeFavoriteLeague: (id: string, matchIds: string[]) => {
          set((state) => ({
            favoriteLeagues: state.favoriteLeagues.filter(
              (leagueId) => leagueId !== id
            ),
            favoriteMatches: state.favoriteMatches.filter(
              (matchId) => !matchIds.includes(matchId)
            ),
          }));
        },
        getMatchesYesterday: () => {
          set({ loading: true });
          get().favoriteMatches.length
            ? getTeamScheduleList(get().favoriteMatches).then(
                ({ data }: { data: any[] }) => {
                  const yesterday = dayjs().subtract(1, "day").startOf("day");
                  const matchesYesterday = data.filter((match) => {
                    const matchDate = dayjs(match.matchAt);
                    return matchDate.isSame(yesterday, "day");
                  });
                  set({
                    data: handleConvertData(matchesYesterday) as Tournament[],
                    loading: false,
                  });
                }
              )
            : set({ data: [], loading: false });
        },
        fetchMatchesByDate: (date: string) => {
          set({
            date,
          });
          createFetchMatches(set, () => getMatches(get().date))();
        },
        getMatchesLive: () => {
          set({ loading: true });
          get().favoriteMatches.length
            ? getTeamScheduleList(get().favoriteMatches).then(
                ({ data }: { data: any[] }) => {
                  const matches = data.filter((match) => match.hasLive);
                  set({
                    data: handleConvertData(matches) as Tournament[],
                    loading: false,
                  });
                }
              )
            : set({ data: [], loading: false });
        },
      };
    },
    {
      name: "my_favorite_matches",
      partialize: (state) => ({
        favoriteMatches: state.favoriteMatches,
        favoriteLeagues: state.favoriteLeagues,
      }),
    }
  )
);

export default useHomeStore;
