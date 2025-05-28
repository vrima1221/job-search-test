import useSWR from "swr";
import axios from "axios";
import { JobsResponse, UseJobsProps } from "@/types/jobs";

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  });
  return response.data;
};

export default function useJobs({ query, page}: UseJobsProps) {
  const shouldFetch = query.trim().length > 0;

  const url = shouldFetch
    ? `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${page}`
    : null;

  const { data, error, isLoading } = useSWR<JobsResponse>(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });  

  return {
    jobs: data?.data || [],
    isLoading,
    error,
  };
}
