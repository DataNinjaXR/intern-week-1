export interface Complaint {
  id: number;
  facility_id: number;
  title: string;
  description: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}
