import React, { useEffect, useState } from "react";
import Empty from "../home/Skeleton/Empty";
import {
  getSportHtFt,
  getSportLeagueStanding,
  getSportOverUnder,
  getSportTopScorers,
} from "@/services/sport";
import Image from "next/image";

const TABS = [
  { id: "standings", label: "BẢNG XẾP HẠNG" },
  { id: "performance", label: "PHONG ĐỘ" },
  { id: "overUnder", label: "TÀI/XỈU" },
  { id: "htFt", label: "HT/FT" },
  { id: "goalKing", label: "VUA PHÁ LƯỚI" },
];

const SUB_TABS = [
  { id: "overall", label: "TOÀN THỂ" },
  { id: "homefield", label: "SÂN NHÀ" },
  { id: "awayfield", label: "SÂN KHÁCH" },
];

const SUB_TABS_PERFORMANCE = [
  { id: "10", label: "10" },
  { id: "15", label: "15" },
];
function TabButton({ id, label, activeTab, setActiveTab }: any) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={activeTab === id}
      aria-controls={`radix-:rov:-content-${id}`}
      data-state={activeTab === id ? "active" : "inactive"}
      id={`radix-:rov:-trigger-${id}`}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        activeTab === id ? "text-foreground shadow bg-primary" : ""
      }`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </button>
  );
}

function MatchStandings({
  leagueId,
  subLeagueId,
  total,
}: {
  leagueId: string;
  subLeagueId: string;
  total: string;
}) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("standings");
  const [subActiveTab, setSubActiveTab] = useState("overall");

  useEffect(() => {
    if (loading && !data && leagueId && subLeagueId) {
      Promise.all([
        getSportLeagueStanding(leagueId, subLeagueId),
        getSportTopScorers(leagueId),
        getSportHtFt(leagueId, subLeagueId),
        getSportOverUnder(leagueId, subLeagueId, total),
      ])
        .then(([leagueStanding, topScorers, htFt, overUnder]) => {
          setData({
            leagueStanding: leagueStanding.data,
            topScorers: topScorers.data,
            htFt: htFt.data,
            overUnder: overUnder.data,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [loading]);

  if (!data || loading) return <Empty loading={loading} />;

  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-:ro8:-trigger-standings"
      id="radix-:ro8:-content-standings"
      tabIndex={0}
      className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0"
    >
      <div>
        <div dir="ltr" data-orientation="horizontal" className="w-full p-0">
          <div dir="ltr" className="relative overflow-hidden">
            <div
              data-radix-scroll-area-viewport
              className="h-full w-full rounded-[inherit]"
              style={{ overflow: "scroll" }}
            >
              <div style={{ minWidth: "100%", display: "table" }}>
                <div
                  role="tablist"
                  aria-orientation="horizontal"
                  className="h-9 p-1 text-muted-foreground bg-transparent w-full md:h-auto flex items-center justify-start gap-5 rounded-none py-1"
                  tabIndex={0}
                  data-orientation="horizontal"
                  style={{ outline: "none" }}
                >
                  {TABS.map((tab) => (
                    <TabButton
                      key={tab.id}
                      id={tab.id}
                      label={tab.label}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            {activeTab === "standings" && (
              <div
                data-state="active"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:rov:-trigger-ranking"
                id="radix-:rov:-content-ranking"
                tabIndex={0}
                className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0"
              >
                <div dir="ltr" data-orientation="horizontal" className="w-full">
                  <div
                    role="tablist"
                    aria-orientation="horizontal"
                    className="h-9 bg-muted p-1 text-muted-foreground rounded-none md:rounded w-full flex items-center justify-start py-6"
                    tabIndex={0}
                    data-orientation="horizontal"
                    style={{ outline: "none" }}
                  >
                    {SUB_TABS.map((subTab) => (
                      <button
                        key={subTab.id}
                        type="button"
                        role="tab"
                        aria-selected={
                          subTab.id === subActiveTab ? "true" : "false"
                        }
                        aria-controls={`radix-:r2a:-content-${subTab.label}`}
                        data-state={
                          subTab.id === subActiveTab ? "active" : "inactive"
                        }
                        id={`radix-:r2a:-trigger-${subTab.label}`}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow py-1.5 ${
                          subTab.id === subActiveTab ? "" : "ml-2"
                        }`}
                        tabIndex={-1}
                        data-orientation="horizontal"
                        data-radix-collection-item
                        onClick={() => setSubActiveTab(subTab.id)}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  data-state="active"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-:rp5:-trigger-overall"
                  id="radix-:rp5:-content-overall"
                  tabIndex={0}
                  className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0"
                >
                  {subActiveTab === "overall" && (
                    <Overall
                      overall
                      standings={mergeData(
                        data.leagueStanding.totalStandings,
                        [],
                        data.leagueStanding.teamInfos
                      )}
                    />
                  )}
                  {subActiveTab === "homefield" && (
                    <Overall
                      standings={mergeData(
                        data.leagueStanding.totalStandings,
                        data.leagueStanding.homeStandings,
                        data.leagueStanding.teamInfos
                      )}
                    />
                  )}
                  {subActiveTab === "awayfield" && (
                    <Overall
                      standings={mergeData(
                        data.leagueStanding.totalStandings,
                        data.leagueStanding.awayStandings,
                        data.leagueStanding.teamInfos
                      )}
                    />
                  )}
                </div>
              </div>
            )}
            {activeTab === "performance" && (
              <div
                data-state="active"
                data-orientation="horizontal"
                role="tabpanel"
                aria-labelledby="radix-:rov:-trigger-ranking"
                id="radix-:rov:-content-ranking"
                tabIndex={0}
                className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0"
              >
                <div dir="ltr" data-orientation="horizontal" className="w-full">
                  <div
                    role="tablist"
                    aria-orientation="horizontal"
                    className="h-9 bg-muted p-1 text-muted-foreground rounded-none md:rounded w-full flex items-center justify-start py-6"
                    tabIndex={0}
                    data-orientation="horizontal"
                    style={{ outline: "none" }}
                  >
                    {SUB_TABS.map((subTab) => (
                      <button
                        key={subTab.id}
                        type="button"
                        role="tab"
                        aria-selected={
                          subTab.id === subActiveTab ? "true" : "false"
                        }
                        aria-controls={`radix-:r2a:-content-${subTab.label}`}
                        data-state={
                          subTab.id === subActiveTab ? "active" : "inactive"
                        }
                        id={`radix-:r2a:-trigger-${subTab.label}`}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow py-1.5 ${
                          subTab.id === subActiveTab ? "" : "ml-2"
                        }`}
                        tabIndex={-1}
                        data-orientation="horizontal"
                        data-radix-collection-item
                      >
                        {subTab.label}
                      </button>
                    ))}
                    {SUB_TABS_PERFORMANCE.map((subTab) => (
                      <button
                        key={subTab.id}
                        type="button"
                        role="tab"
                        aria-selected={
                          subTab.id === subActiveTab ? "true" : "false"
                        }
                        aria-controls={`radix-:r2a:-content-${subTab.label}`}
                        data-state={
                          subTab.id === subActiveTab ? "active" : "inactive"
                        }
                        id={`radix-:r2a:-trigger-${subTab.label}`}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow py-1.5 ${
                          subTab.id === subActiveTab ? "" : "ml-2"
                        }`}
                        tabIndex={-1}
                        data-orientation="horizontal"
                        data-radix-collection-item
                        onClick={() => setSubActiveTab(subTab.id)}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  data-state="active"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-:rp5:-trigger-overall"
                  id="radix-:rp5:-content-overall"
                  tabIndex={0}
                  className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0"
                >
                  {subActiveTab === "overall" && (
                    <Overall
                      standings={mergeData(
                        data.leagueStanding.totalStandings,
                        [],
                        data.leagueStanding.teamInfos
                      )}
                    />
                  )}
                  {subActiveTab === "homefield" && (
                    <Overall
                      standings={mergeData(
                        data.leagueStanding.totalStandings,
                        data.leagueStanding.homeStandings,
                        data.leagueStanding.teamInfos
                      )}
                    />
                  )}
                  {subActiveTab === "awayfield" && (
                    <Overall
                      standings={mergeData(
                        data.leagueStanding.totalStandings,
                        data.leagueStanding.awayStandings,
                        data.leagueStanding.teamInfos
                      )}
                    />
                  )}
                </div>
              </div>
            )}
            {activeTab === "overUnder" && <Empty loading={loading} />}
            {activeTab === "htFt" && <Empty loading={loading} />}
            {activeTab === "goalKing" && <Empty loading={loading} />}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TeamInfo {
  teamId: string;
  name: string;
  logo: string;
}

function mergeData(
  standings: Standing[],
  data: any[],
  teams: TeamInfo[]
): (Standing & TeamInfo)[] {
  const result = !data.length ? standings : data;
  return result.map((standing) => {
    const teamInfo = teams.find((team) => team.teamId === standing.teamId);
    const team = standings.find((team) => team.teamId === standing.teamId);

    if (teamInfo) {
      return { ...standing, ...teamInfo, ...team };
    } else {
      return standing;
    }
  });
}

const Overall = ({
  standings,
  overall = false,
}: {
  standings: Standing[];
  overall?: boolean;
}) => {
  return (
    <>
      <Table standings={standings} overall={overall} />
      {overall && (
        <div className="md:p-1 p-2">
          <div className="flex py-1 gap-3">
            <span className="text-center rounded block w-[14px] h-[14px] bg-[rgb(0,70,130)]" />
            <span className="text-xs">
              Lọt vào (cúp quốc tế) - Champions League (Vòng Bảng:)
            </span>
          </div>
          <div className="flex py-1  gap-3">
            <span className="text-center rounded block w-[14px] h-[14px] bg-[rgb(127,0,41)]" />
            <span className="text-xs">
              Lọt vào (cúp quốc tế) - Europa League (Vòng Bảng:)
            </span>
          </div>
          <div className="flex  py-1 gap-3">
            <span className="text-center rounded block w-[14px] h-[14px] bg-[rgb(189,0,0)]" />
            <span className="text-xs">Rớt hạng - Championship</span>
          </div>
        </div>
      )}

      <div className="w-full md:p-1 p-2 text-xs">
        Nếu các đội bằng điểm nhau vào cuối mùa giải, việc xếp hạng sẽ dựa vào
        hiệu số bàn thắng.
      </div>
      <Empty />
    </>
  );
};

const Table = ({
  standings,
  overall,
}: {
  standings: Standing[];
  overall: boolean;
}) => {
  return (
    <div
      data-radix-scroll-area-viewport
      className="h-full w-full rounded-[inherit]"
      style={{ overflow: "scroll" }}
    >
      <div style={{ minWidth: "100%", display: "table" }}>
        <div className="w-full  whitespace-nowrap">
          <div className="flex md:rounded  w-full font-medium">
            <div className="md:rounded-l rounded-l-none min-w-9 z-10 py-1.5 pl-2 bg-muted text-start left-0 sticky">
              #
            </div>
            <div className=" min-w-[120px] py-1.5 bg-muted z-10 text-start flex-1 left-9 sticky flex-shrink-0 flex overflow-hidden text-ellipsis">
              ĐỘI
            </div>
            <div className="flex md:flex-nowrap ">
              <div className="min-w-8 text-center py-1.5  bg-muted">TR</div>
              <div className="min-w-8 text-center py-1.5  bg-muted">W</div>
              <div className="min-w-8 text-center py-1.5  bg-muted">H</div>
              <div className="min-w-8 text-center py-1.5  bg-muted">L</div>
              <div className="min-w-12 text-center py-1.5  bg-muted">G</div>
              <div className="min-w-12 text-center py-1.5  bg-muted">HSBT</div>
              <div className="min-w-8 text-center py-1.5  bg-muted">Đ</div>
              <div className="min-w-[160px] text-center py-1.5  bg-muted md:rounded-r rounded-r-none">
                PHONG ĐỘ{" "}
              </div>
            </div>
          </div>
          {standings.map((team) => (
            <div
              key={team.teamId}
              className="flex w-full text-[13px] items-center py-2.5 hover:bg-primary/5 border-b border-muted"
            >
              {overall ? (
                <div className="min-w-9 md:pl-0 pl-2 md:bg-transparent bg-white dark:bg-[#0a0a0b] left-0 sticky z-10 overflow-x-hidden overflow-y-hidden">
                  <span className="text-center rounded block w-[20px] h-[20px] dark:text-[#eee] text-gray-500 bg-[rgb(0,70,130)]">
                    {team.rank}.
                  </span>
                </div>
              ) : (
                <div className="min-w-9 md:pl-0 pl-2 md:bg-transparent bg-white dark:bg-[#0a0a0b] left-0 sticky z-10 overflow-x-hidden overflow-y-hidden">
                  <span className="text-center rounded block w-[20px] h-[20px] dark:text-[#eee] text-gray-500">
                    {team.rank}.
                  </span>
                </div>
              )}

              <div className="min-w-[120px] md:bg-transparent bg-white dark:bg-[#0a0a0b] md:after:shadow-none after:top-[-12px] after:h-[43.5px] after:shadow-[3px_0_4px_0_rgba(255,255,255,0.08)] after:w-[5px] after:right-0 after:absolute  left-9 sticky z-10 whitespace-nowrap flex text-start flex-1 flex-shrink-0 ">
                <Image
                  alt=""
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  data-nimg={1}
                  className="mr-2"
                  src={team.logo}
                  style={{ color: "transparent" }}
                />
                <span className="overflow-hidden text-ellipsis">
                  {team.name}
                </span>
              </div>
              <div className="flex  md:flex-nowrap ">
                <div className="min-w-8 text-center ">
                  <span>{team.totalCount}</span>
                </div>
                <div className="min-w-8  text-center">
                  <span>{team.winCount}</span>
                </div>
                <div className="min-w-8  text-center">
                  <span>{team.drawCount}</span>
                </div>
                <div className="min-w-8  text-center">
                  <span>{team.loseCount}</span>
                </div>
                <div className="min-w-12  text-center">
                  <span>
                    {team.getScore}:{team.loseScore}
                  </span>
                </div>
                <div className="min-w-12  text-center">
                  <span>{team.goalDifference}</span>
                </div>
                <div className="min-w-8  text-center">
                  <span>{team.integral}</span>
                </div>
                <div className="min-w-[160px] px-2  text-[#eee] flex items-center justify-evenly">
                  {[
                    3,
                    team.recentFirstResult,
                    team.recentSecondResult,
                    team.recentThirdResult,
                    team.recentFourthResult,
                    team.recentFifthResult,
                  ].map((result, idx) => (
                    <span
                      key={idx}
                      className={`w-5 rounded flex items-center justify-center ${
                        result === 0
                          ? "bg-[#00A83F]"
                          : result === 2
                          ? "bg-[#DC0000]"
                          : result === 1
                          ? "bg-[#f3a000]"
                          : result === 3
                          ? "bg-[#c8cdcd]"
                          : ""
                      }`}
                    >
                      {result === 3
                        ? "?"
                        : result === 0
                        ? "W"
                        : result === 2
                        ? "L"
                        : "H"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchStandings;
