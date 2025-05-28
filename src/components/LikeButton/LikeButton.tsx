"use client";
import useLikedJobs from "@/hooks/useLikedJobs";
import { Job } from "@/types/jobs";
import Button from "../Button";

const LikeButton = ({ job } : {
  job: Job
}) => {
  const { like, unlike, isLiked } = useLikedJobs();

  const liked = isLiked(job.job_id);

  return (
    <Button
      className={`px-4 py-2 ${liked ? "bg-red-500" : "bg-gray-300"}`}
      onClick={() => (liked ? unlike(job.job_id) : like(job))}
    >
      {liked ? "Unlike" : "Like"}
    </Button>
  );
};

export default LikeButton
