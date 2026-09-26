export interface Inspection {
  id: number;
  facility_id: number;
  inspector_name: string;
  inspection_date: string;
  score: number;
  remarks: string;
  created_at?: string;
  updated_at?: string;
}
