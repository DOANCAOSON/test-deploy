import { handleApiRequest } from "@/utils";

export const getMatches = (time: string) => handleApiRequest("GET", `/api/sport?Time=${time}&TimeZone=7`);
export const getMatchesLive = () => handleApiRequest("GET", "/api/sport/live?hasLive=true");
export const getMatchesListLive = () => handleApiRequest("GET", "/api/sport/live");

export const getCountries = () =>
  handleApiRequest("GET", "/api/sport/countries");
export const getLeaguesById = (countryId: string) =>
  handleApiRequest(
    "GET",
    `/api/sport/countries/leagues?countryId=${countryId}`
  );
export const getMatchDetail = () =>
  handleApiRequest(
    "GET",
    `/api/sport/detail?matchId=${location.pathname?.split("/")[2]}`
  );
export const getLeagueDetailById = () =>
  handleApiRequest(
    "GET",
    `/api/sport/leagues/?leagueId=${location.pathname?.split("/")[3]}`
  );
export const getLeagueSchedulesFnished = () =>
  handleApiRequest(
    "GET",
    `/api/sport/leagues/schedule/finished?leagueId=${
      location.pathname?.split("/")[3]
    }`
  );
  export const getLeagueSchedulesNotFinished = () =>
    handleApiRequest(
      "GET",
      `/api/sport/leagues/schedule/notfinished?leagueId=${
        location.pathname?.split("/")[3]
      }`
    );

export const getSportSchedulesTips = () =>
  handleApiRequest("GET", `/api/sport/leagues/schedule/for-tips`);
export const getSportEvents = (matchId: string) =>
  handleApiRequest("GET", `/api/sport/events?matchId=${matchId}`);
export const getSportOdds = (matchId: string) =>
  handleApiRequest("GET", `/api/sport/odds?matchId=${matchId}`);
export const getSportStats = (matchId: string) =>
  handleApiRequest("GET", `/api/sport/stats?matchId=${matchId}`);
export const getSportH2h = (matchId: string) =>
  handleApiRequest("GET", `/api/sport/h2h?matchId=${matchId}`);


export const getSportLeagueStanding = (leagueId: string, subLeagueId: string) =>
  handleApiRequest("GET", `/api/sport/standing?leagueId=${leagueId}&subLeagueId=${subLeagueId}`);
export const getSportTopScorers = (leagueId: string) =>
  handleApiRequest("GET", `/api/sport/top-scorers?leagueId=${leagueId}`);
export const getSportHtFt = (leagueId: string, subLeagueId: string) =>
  handleApiRequest("GET", `/api/sport/ht-ft?leagueId=${leagueId}&subLeagueId=${subLeagueId}`);
export const getSportOverUnder = (leagueId: string, subLeagueId: string, total: string) =>
  handleApiRequest("GET", `/api/sport/over-under?leagueId=${leagueId}&subLeagueId=${subLeagueId}&total=${total}`);

export const getSportSearch = (searchKey: string) =>
  handleApiRequest("GET", `/api/sport/search?searchKey=${searchKey}`);
export const getSportTeam = () =>
  handleApiRequest("GET", `/api/sport/teams?teamId=${location.pathname?.split("/")[3]}`);

export const getTeamSchedulesToday = () =>
  handleApiRequest(
    "GET",
    `/api/sport/teams/schedule/today?teamId=${
      location.pathname?.split("/")[3]
    }`
  );

  export const getTeamScheduleList = (matchIds: string[]) =>
    handleApiRequest(
      "GET",
      `/api/sport/list?${
        matchIds.map(id => `MatchIds=${id}`).join('&')
      }`
    );