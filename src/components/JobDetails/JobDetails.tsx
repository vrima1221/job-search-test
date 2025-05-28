"use client";

import useJobDetails from "@/hooks/useJobDetails";
import LikeButton from "../LikeButton";
import Loader from "../Loader";
import Button from "../Button";
import Link from "next/link";

export default function JobDetails({ id }: { id: string }) {
  const { job, isLoading, error } = useJobDetails(id);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div>
      <div className="flex justify-between align-middle mb-4">
        <h2 className="text-xl font-bold">{`${job.job_title} | ${job.employer_name}`}</h2>
        {job.employer_logo && (
          <img
            src={job.employer_logo}
            alt={job.job_title}
            className="w-8 h-8 object-contain"
          />
        )}
      </div>
      <p className="mb-4">{job.job_description}</p>
      <div className="flex justify-between items-center">
        <LikeButton job={job} />

        <Button>
          <Link href={job.job_apply_link} target="_blank">
            Apply
          </Link>
        </Button>
      </div>
    </div>
  );
}
