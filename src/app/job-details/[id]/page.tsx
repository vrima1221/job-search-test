
import { Metadata } from "next";
import axios from "axios";
import JobDetails from "@/components/JobDetails/JobDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const res = await axios.get(`https://jsearch.p.rapidapi.com/job-details?job_id=${id}`, {
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  });

  const job = res.data?.data?.[0];

  return {
    title: job?.job_title || "Job Details",
    description: job?.job_description?.slice(0, 160),
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <JobDetails id={id} />;
}
