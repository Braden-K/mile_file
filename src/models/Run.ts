export interface Run {
  id: number;
  runGroupId: number;
  user_id: string;
  distance: number;
  duration: number;
  avg_hr: number | null;
  description: string | null;
  intensity: number | null;
  date: Date;
}
