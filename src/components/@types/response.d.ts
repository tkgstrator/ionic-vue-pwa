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
}

export interface Schedule {
  start_time: string;
  stage_id: number;
  end_time: string;
  rare_weapon?: number;
  weapon_list: number[];
}
