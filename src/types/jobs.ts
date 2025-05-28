export interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city?: string;
  job_country?: string;
  job_description: string;
  job_apply_link: string;
  job_employment_type?: string;
  employer_logo?: string;
}

export interface JobsResponse {
  data: Job[];
  metadata: {
    total: number;
    page: number;
    page_count: number;
  };
}

export interface ResultsProps {
  isLoading: boolean;
  error: Error | null | undefined;
  jobs: Job[];
  total?: number
}

export interface JobDetailsResponse {
  data: Job[];
}

export interface UseJobsProps {
  query: string;
  page: number;
  perPage?: number;
}