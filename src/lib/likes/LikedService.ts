import { Job } from "@/types/jobs";

export class LikedService {
  private storageKey = "likedJobs";

  private getLiked(): Job[] {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    } catch {
      return [];
    }
  }

  private saveLiked(jobs: Job[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(jobs));
  }

  getAll(): Job[] {
    return this.getLiked();
  }

  isLiked(id: string): boolean {
    return this.getLiked().some((job) => job.job_id === id);
  }

  like(job: Job): void {
    const jobs = this.getLiked();
    if (!this.isLiked(job.job_id)) {
      this.saveLiked([...jobs, job]);
    }
  }

  unlike(id: string): void {
    const updated = this.getLiked().filter((job) => job.job_id !== id);
    this.saveLiked(updated);
  }
}
