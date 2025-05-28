import { JobDetailsResponse } from "@/types/jobs";
import axios from "axios";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  });
  return response.data;
};

export default function useJobDetails(id: string) {
  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${id}`;

  const { data, error, isLoading } = useSWR<JobDetailsResponse>(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  return {
    job: data?.data[0] || null,
    isLoading,
    error,
  };
}
