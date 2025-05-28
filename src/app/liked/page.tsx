'use client';

import List from "@/components/List";
import JobCard from "@/components/JobCard";
import useLikedJobs from "@/hooks/useLikedJobs";

export default function LikedPage() {
  const { liked } = useLikedJobs()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Liked Jobs</h1>
      {liked.length === 0 ? (
        <p>No liked jobs yet.</p>
      ) : (
        <List columns={1}>
          {liked.map(job => <JobCard job={job} key={job.job_id}/>)}
        </List>
      )}
    </div>
  );
}