export interface Run {
  id: number;
  user_id: string;
  distance: number;
  duration: number;
  avg_hr: number | null;
  description: string | null;
  shoe_id: number | null;
  date: Date;
  type: string | null;
}
