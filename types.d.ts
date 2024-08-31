declare interface Input {
  name: string;
  required?: { value: boolean; message: string };
  type: string;
  label?: string;
  placeholder?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  defaultValue?: string;
  value?: string | number;
  targetURL?: string;
  id?: string;
  target?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  disabled?: boolean;
  data?: { name: string; value: string }[];
  className?: string;
  options?: {
    value: string | number;
    hidden?: boolean;
    text: string;
  }[];
  width?: string;
  rows?: number;
  componentEnd?: () => JSX.Element;
  validation?: (value: string) => any;
  renderInput?: JSX.Element;
  onChange?: (val: any) => void;
  onInput?: (val) => void;
}

declare interface Response {
  code: number;
  isError: boolean;
  error: number;
  message: string;
}

declare interface JWT {
  token: string;
  accessTokenExpriesAt: string; // Note: There seems to be a typo in the property name ("Expries")
  refreshToken: string;
  expiration: string;
}

declare interface UserInfo {
  id: string;
  userName: string;
  fullName: string;
  avatar: string;
  bio: string;
  email: string;
  userId: string;
  phoneCode: string;
  phoneNumber: string;
  totalTips: number;
  totalLike: number;
  totalFollowers: number;
}

declare interface User {
  jwt: JWT;
  userInfo: UserInfo;
}

declare interface AccountBody {
  avatar: string;
  email: string;
  userName: string;
  phoneCode: string;
  phoneNumber: string;
  fullName: string;
  bio: string;
  totalTips: number;
  totalLike: number;
  totalFollowers: number;
}

declare interface Category {
  id: string;
  title: string;
  image: string;
  description: string;
  slug: string;
}

declare interface Author {
  userName: string;
  fullname: string;
  email: string;
  avatar: string | null;
}

declare interface Article {
  briefContent: string;
  id: string;
  title: string;
  image: string | null;
  thumbnails: string;
  description: string;
  slug: string;
  source: string;
  author: Author;
  categoryId: string;
  categoryTitle: string;
  categorySlug: string;
  visitCount: number;
  createdAt: string;
  updatedAt: string | null;

  content: string;
}

interface Odds {
  matchId: string;
  match: { matchId: string; awayName: string; homeName: string };
  europeOdds: any; // Change the type if more information is known about this field
  handicap: any[];
  overUnder: any; // Change the type if more information is known about this field
  handicapHalf: any; // Change the type if more information is known about this field
  overUnderHalf: any; // Change the type if more information is known about this field
  euroHandicapPreMatch: any; // Change the type if more information is known about this field
  doubleChancePreMatch: any; // Change the type if more information is known about this field
}

interface Handicap {
  companyId: string;
  initialHandicap: string;
  initialHome: string;
  initialAway: string;
  instantHandicap: string;
  instantHome: string;
  instantAway: string;
  maintenance: boolean;
  inPlay: boolean;
  handicapIndex: number;
  handicapCount: number;
  changeTime: number;
  close: boolean;
  oddsType: number;
}

declare interface Match {
  odds: Odds;
  tips: number;
  matchId: string;
  matchAt: string;
  leagueId: string;
  leagueType: number;
  leagueName: string;
  leagueShortName: string;
  matchTime: number;
  status: number;
  homeName: string;
  homeLogo: string;
  awayName: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  explain: string;
  neutral: boolean;
  leagueColor: string;
  leagueLogo: string;
  countryId: string;
  countryName: string;
  countryLogo: string;
  subLeagueId: string;
  subLeagueName: string;
  halfStartTime: number;
  homeId: string;
  awayId: string;
  homeHalfScore: number;
  awayHalfScore: number;
  homeRed: number;
  awayRed: number;
  homeYellow: number;
  awayYellow: number;
  homeCorner: number;
  awayCorner: number;
  homeRank: string;
  awayRank: string;
  season: string;
  round: string;
  group: string;
  location: string;
  weather: string;
  temperature: string;
  hasLineup: boolean;
  injuryTime: number;
  isHot: boolean;
  isHiddenLive: boolean;
  hasLive: boolean;
  id: string;
}

declare interface Odds {
  matchId: string;
  europeOdds: EuropeOdd[];
  handicap: null;
  overUnder: null;
  handicapHalf: null;
  overUnderHalf: null;
  euroHandicapPreMatch: EuroHandicapPreMatch[];
  doubleChancePreMatch: DoubleChancePreMatch[];
}

declare interface EuropeOdd {
  companyId: string;
  initialHome: string;
  initialDraw: string;
  initialAway: string;
  instantHome: string;
  instantDraw: string;
  instantAway: string;
  handicapIndex: number;
  changeTime: number;
  close: boolean;
  oddsType: number;
}

declare interface EuroHandicapPreMatch {
  matchId: string;
  companyId: string;
  odds: HandicapOdds;
  changeTime: number;
}

declare interface HandicapOdds {
  handicap: string;
  home: string;
  draw: string;
  away: string;
}

declare interface DoubleChancePreMatch {
  matchId: string;
  companyId: string;
  odds: DoubleChanceOdds;
  changeTime: number;
}

declare interface DoubleChanceOdds {
  homeDraw: string;
  homeAway: string;
  drawAway: string;
}

declare interface MatchDetail {
  odds: Odds;
  matchId: string;
  matchAt: string;
  leagueId: string;
  leagueType: number;
  leagueName: string;
  leagueShortName: string;
  matchTime: number;
  status: number;
  homeName: string;
  homeLogo: string;
  awayName: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  explain: string;
  extraExplain: null;
  neutral: boolean;
  leagueColor: string;
  leagueLogo: string;
  countryId: string;
  countryName: string;
  countryLogo: string;
  subLeagueId: string;
  subLeagueName: string;
  halfStartTime: number;
  homeId: string;
  awayId: string;
  homeHalfScore: number;
  awayHalfScore: number;
  homeRed: number;
  awayRed: number;
  homeYellow: number;
  awayYellow: number;
  homeCorner: number;
  awayCorner: number;
  homeRank: string;
  awayRank: string;
  season: string;
  round: string;
  group: string;
  location: string;
  weather: string;
  temperature: string;
  hasLineup: boolean;
  injuryTime: number;
  isHot: boolean;
  isHiddenLive: boolean;
  hasLive: boolean;
  playSd: null;
  playHd: null;
  id: string;
}

declare interface Tournament {
  countryId: string;
  countryLogo: string;
  countryName: string;
  leagueColor: string;
  leagueId: string;
  leagueLogo: string;
  leagueName: string;
  location: string;
  leagueShortName: string;
  round: string;
  matches: Match[];
}

interface MatchSummary {
  matchId: string;
  matchTime: number;
  homeId: string;
  homeName: string;
  homeLogo: string;
  awayId: string;
  awayName: string;
  awayLogo: string;
  status: number;
  homeScore: number;
  awayScore: number;
  halfStartTime: number;
  leagueId: string;
  leagueName: string;
}

interface Tip {
  username: string;
  avatar: string | null;
  id: string;
  slug: string;
  title: string;
  matchSummary: MatchSummary;
  createdAt: string;
  isWin: boolean | null;
  chosenOdds: string;
  totalTips: string;
  winRate: string;
  chosenOddsName: string;
}

interface League {
  totalRound: number;
  currentRound: number;
  currentSeason: string;
  countryId: string;
  country: string;
  countryLogo: string;
  areaId: number;
  leagueShortName: string;
  statges: any[];
  subLeagues: any[];
  id: string;
  leagueId: string;
  leagueColor: string;
  type: number;
  leagueName: string;
  leagueType: string;
  color: string;
  logo: string;
  countryName: string;
  name: string;
  shortName: string;
  subLeagueName: string;
}

interface Country {
  country: string;
  countryId: string;
  countryLogo: string;
  leagues: League[];
}

interface PromotionCategory {
  id: string;
  title: string;
  description: string;
  slug: string;
  order: number;
}

interface MatchSummary {
  matchId: string;
  matchTime: number;
  homeId: string;
  homeName: string;
  homeLogo: string;
  awayId: string;
  awayName: string;
  awayLogo: string;
  status: number;
  homeScore: number;
  awayScore: number;
  halfStartTime: number;
  leagueId: string;
  leagueName: string;
}

interface UserSummary {
  userId: string;
  username: string;
  avatar: string | null;
  bio: string | null;
  totalTips: number;
  totalLike: number;
  totalFollower: number;
  winRate: number;
  roi: number;
  avgOdds: number;
  isFollowing: boolean;
}

interface OtherTip {
  id: string;
  slug: string;
  title: string;
  matchSummary: MatchSummary;
  createdAt: string;
  chosenOdds: number;
  chosenOddsName: string;
}

interface Tip {
  id: string;
  slug: string;
  title: string;
  matchSummary: MatchSummary;
  createdAt: string;
  isWin: boolean | null;
  chosenOdds: number;
  userSummary: UserSummary;
  rate1: string;
  rate2: string;
  rate3: string;
  content: string;
  listOtherTips: OtherTip[];
  views: number;
  like: number;
  liked: boolean;
}

interface Comment {
  articleId: string;
  comment: string;
  parentCommentId: string | null;
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  isDeleted: boolean;
}

interface EuropeOdds {
  companyId: string;
  initialHome: string;
  initialDraw: string;
  initialAway: string;
  instantHome: string;
  instantDraw: string;
  instantAway: string;
  handicapIndex: number;
  changeTime: number;
  close: boolean;
  oddsType: number;
}

interface Handicap {
  companyId: string;
  initialHandicap: string;
  initialHome: string;
  initialAway: string;
  instantHandicap: string;
  instantHome: string;
  instantAway: string;
  maintenance: boolean;
  inPlay: boolean;
  handicapIndex: number;
  handicapCount: number;
  changeTime: number;
  close: boolean;
  oddsType: number;
}

interface OverUnder {
  companyId: string;
  initialHandicap: string;
  initialOver: string;
  initialUnder: string;
  instantHandicap: string;
  instantOver: string;
  instantUnder: string;
  handicapIndex: number;
  changeTime: number;
  close: boolean;
  oddsType: number;
}

interface HandicapHalf {
  companyId: string;
  initialHandicap: string;
  initialHome: string;
  initialAway: string;
  instantHandicap: string;
  instantHome: string;
  instantAway: string;
  inPlay: boolean;
  handicapIndex: number;
  changeTime: number;
  oddsType: number;
}

interface OverUnderHalf {
  companyId: string;
  initialHandicap: string;
  initialOver: string;
  initialUnder: string;
  instantHandicap: string;
  instantOver: string;
  instantUnder: string;
  handicapIndex: number;
  changeTime: number;
  oddsType: number;
}

interface DoubleChancePreMatch {
  matchId: string;
  companyId: string;
  odds: {
    homeDraw: string;
    homeAway: string;
    drawAway: string;
  };
  changeTime: number;
}

interface Odds {
  matchId: string;
  europeOdds: EuropeOdds[];
  handicap: Handicap[];
  overUnder: OverUnder[];
  handicapHalf: HandicapHalf[];
  overUnderHalf: OverUnderHalf[];
  euroHandicapPreMatch: any[];
  doubleChancePreMatch: DoubleChancePreMatch[];
}

declare interface MatchData {
  odds: Odds;
  matchId: string;
  matchAt: string;
  leagueId: string;
  leagueType: number;
  leagueName: string;
  leagueShortName: string;
  matchTime: number;
  status: number;
  homeName: string;
  homeLogo: string;
  awayName: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  explain: string;
  neutral: boolean;
  leagueColor: string;
  leagueLogo: string;
  countryId: string;
  countryName: string;
  countryLogo: string;
  subLeagueId: string;
  subLeagueName: string;
  halfStartTime: number;
  homeId: string;
  awayId: string;
  homeHalfScore: number;
  awayHalfScore: number;
  homeRed: number;
  awayRed: number;
  homeYellow: number;
  awayYellow: number;
  homeCorner: number;
  awayCorner: number;
  homeRank: string;
  awayRank: string;
  season: string;
  round: string;
  group: string;
  location: string;
  weather: string;
  temperature: string;
  hasLineup: boolean;
  injuryTime: number;
  isHot: boolean;
  isHiddenLive: boolean;
  hasLive: boolean;
  id: string;
}

declare interface TipData {
  chosenOdds: number;
  matchId: string;
  rate1: string;
  rate2: string;
  rate3: string;
  title: string;
}

interface Event {
  eventId: string;
  minute: string;
  type: number;
  playerId: string;
  playerName: string;
  assistPlayerId: string;
  overtime: string;
  homeEvent: boolean;
}

interface MatchEvents {
  matchId: string;
  events: Event[];
  penalty: any[];
}

interface Odds {
  companyId: string;
  initialHome?: string;
  initialDraw?: string;
  initialAway?: string;
  instantHome?: string;
  instantDraw?: string;
  instantAway?: string;
  handicapIndex: number;
  changeTime: number;
  close: boolean;
  oddsType: number;
  initialHandicap?: string;
  initialOver?: string;
  initialUnder?: string;
  instantHandicap?: string;
  instantOver?: string;
  instantUnder?: string;
  maintenance?: boolean;
  inPlay?: boolean;
  handicapCount?: number;
}

interface EuroHandicapPreMatch {
  matchId: string;
  companyId: string;
  odds: {
    handicap: string;
    home: string;
    draw: string;
    away: string;
  };
  changeTime: number;
}

interface DoubleChancePreMatch {
  matchId: string;
  companyId: string;
  odds: {
    homeDraw: string;
    homeAway: string;
    drawAway: string;
  };
  changeTime: number;
}

interface MatchOdds {
  matchId: string;
  europeOdds: Odds[];
  handicap: Odds[];
  overUnder: Odds[];
  handicapHalf: Odds[];
  overUnderHalf: Odds[];
  euroHandicapPreMatch: EuroHandicapPreMatch[];
  doubleChancePreMatch: DoubleChancePreMatch[];
}

interface Standing {
  rank: number;
  teamId: string;
  winRate: string;
  drawRate: string;
  loseRate: string;
  winAverage: string;
  loseAverage: string;
  deduction: string;
  deductionExplain: string;
  recentFirstResult: number;
  recentSecondResult: number;
  recentThirdResult: number;
  recentFourthResult: number;
  recentFifthResult: number;
  recentSixthResult: number;
  color: string;
  red: number;
  totalCount: number;
  winCount: number;
  drawCount: number;
  loseCount: number;
  getScore: number;
  loseScore: number;
  goalDifference: number;
  totalAddScore: number;
  integral: number;
  name: string;
  logo: string;
}

interface Team {
  teamId: string;
  leagueId: string;
  name: string;
  logo: string;
  area: string;
}
