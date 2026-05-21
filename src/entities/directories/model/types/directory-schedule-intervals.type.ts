export type DirectoryScheduleIntervalsType = string[];

export interface IDirectoryScheduleIntervalsCredentials {
  params: {
    user_id: string;
    location_id: string;
  }
  query: {
    date: string;
    duration: number;
  }
}
