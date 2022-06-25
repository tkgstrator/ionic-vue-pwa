interface StatsIkura {
  ikura_num: number;
  golden_ikura_num: number;
}

interface StatsType {
  max: StatsIkura;
  min: StatsIkura;
  avg: StatsIkura;
  count: number;
}

interface WaveStatsType extends StatsType {
  max: StatsIkura;
  min: StatsIkura;
  avg: StatsIkura;
  count: number;
  event_type: number;
  water_level: number;
}

interface TotalStatsType extends StatsType {
  max: StatsIkura;
  min: StatsIkura;
  avg: StatsIkura;
  count: number;
  no_night_waves: boolean;
}

export interface WaveStats {
  global: WaveStatsType[];
  player?: WaveStatsType[];
}

export interface TotalStats {
  global: TotalStatsType[];
  player?: TotalStatsType[];
}

export interface SingleStats {
  crew?: StatsType;
  global: StatsType;
  player?: StatsType;
  team?: StatsType;
}

export interface ShiftStats {
  single: SingleStats;
  total: TotalStats;
  waves: WaveStats;
  stats: LegacyStats;
}

export interface BossCount {
  appearances: number;
  defeated: number;
}

export interface LegacyStats {
  job_result: {
    is_clear: {
      count: number;
    };
    is_failure: {
      count: number;
      failure_reason: {
        wipe_out: number[];
        time_limit: number[];
      };
    };
    ikura_num: {
      sum: number;
      avg: number;
      sd: number;
    };
    golden_ikura_num: {
      sum: number;
      avg: number;
      sd: number;
    };
  };
  boss_counts: BossCount[];
}

export interface Schedule {
  start_time: string;
  stage_id: number;
  end_time: string;
  rare_weapon?: number;
  weapon_list: number[];
}

interface JobResult {
  failure_reason?: string;
  failure_wave?: number;
  is_clear: boolean;
}

interface Player {
  nsaid: string;
  name: string;
  grade_point?: number;
}

interface Wave {
  event_type: number;
  water_level: number;
  golden_ikura_num: number;
  golden_ikura_pop_num: number;
  ikura_num: number;
  quota_num: number;
}

interface Result {
  salmon_id: number;
  job_result: JobResult;
  golden_ikura_num: number;
  ikura_num: number;
  no_night_waves: boolean;
  danger_rate: number;
  play_time: string;
  waves: Wave[];
}

interface TotalRank {
  golden_ikura_num: number;
  rank: number;
  members: string[];
}

interface Ranking {
  total: {
    night: TotalRank[];
    nightless: TotalRank[];
  };
}
