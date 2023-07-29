export interface RunTableRow {
  id: number;
  date: string;
  distance: number;
  pace: number;
  hr: number | null;
  type: string | null;
}
