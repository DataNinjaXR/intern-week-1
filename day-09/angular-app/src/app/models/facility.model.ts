export interface Facility {
  id: number;
  name: string;
  location: string;
  cleanliness_score: number | null;
  status: string;
  created_at?: string;
  updated_at?: string;
}
