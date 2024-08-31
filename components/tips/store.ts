import { create } from "zustand";

interface OddsData {
  match: { matchId: string; awayName: string; homeName: string; };
  europeOdds: any; 
  handicap: any;
  overUnder: any;
}

interface OddsStore {
  odds: OddsData | null;
  data?: TipData;
  setOdds: (newOdds: Odds) => void;
  setData: (data: TipData) => void;
}

export const useTipsStore = create<OddsStore>((set, get) => ({
  odds: null,
  setOdds: (newOdds: Odds) => set({ odds: newOdds }),
  setData: (data: TipData) => set({ data: { ...get().data, ...data } }),
}));
