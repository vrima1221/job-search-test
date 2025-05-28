import { Job } from "@/types/jobs";
import Link from "next/link";
import LikeButton from "../LikeButton";
import Button from "../Button";

const JobCard = ({ job }: { job: Job }) => {
  const {
    job_id,
    job_title,
    job_description,
    job_apply_link,
    job_city,
    job_country,
    job_employment_type,
  } = job;

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
      <div className="flex flex-col gap-2 mb-2">
        <p>{job_title}</p>
        <p>City: {job_city || 'Not specified'}</p>

        <p className="capitalize">{job_employment_type}</p>
      </div>

      <div className="flex items-center justify-between">
        <Button>
          <Link href={`/job-details/${job_id}`}>Details</Link>
        </Button>

        <LikeButton job={job} />
      </div>
    </div>
  );
};

export default JobCard;
