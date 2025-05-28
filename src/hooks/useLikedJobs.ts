import { useEffect, useState } from "react";
import { Job } from "@/types/jobs";
import { likedService } from "@/lib/likes";

export default function useLikedJobs() {
  const [liked, setLiked] = useState<Job[]>([]);

  useEffect(() => {
    setLiked(likedService.getAll());
  }, []);

  const like = (job: Job) => {
    likedService.like(job);
    setLiked(likedService.getAll());
  };

  const unlike = (id: string) => {
    likedService.unlike(id);
    setLiked(likedService.getAll());
  };

  const isLiked = (id: string) => likedService.isLiked(id);

  return { liked, like, unlike, isLiked };
}
