"use client";
import { useEffect, useState } from "react";
import useJobs from "@/hooks/useJobs";
import List from "@/components/List";
import JobCard from "@/components/JobCard";
import Loader from "@/components/Loader";
import useDebounce from "@/hooks/useDebounce";
import { ResultsProps } from "@/types/jobs";
import Button from "@/components/Button";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 500);

  const [recommendedQuery, setRecommendedQuery] = useState("");

  useEffect(() => {
    const profileData = localStorage.getItem("profile");
    if (profileData) {
      const profile = JSON.parse(profileData);
      if (profile?.title) {
        setRecommendedQuery(profile.title);
      }
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const {
    jobs: recommendedJobs,
    isLoading: loadingRecommended,
    error: errorRecommended,
  } = useJobs({ query: recommendedQuery, page });

  const {
    jobs: searchedJobs,
    isLoading: loadingSearched,
    error: errorSearched,
  } = useJobs({ query: debouncedQuery, page });

  const showSearchResults = debouncedQuery.trim().length > 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Job Search</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border w-full mb-4 outline-none"
      />
      {showSearchResults ? (
        <>
          <SearchResults
            isLoading={loadingSearched}
            error={errorSearched}
            jobs={searchedJobs}
          />

          {!loadingSearched && (
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded ${
                  page === 1 && "opacity-50 cursor-not-allowed"
                }`}
              >
                Prev
              </Button>
              <Button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 "
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <RecommendedResults
          isLoading={loadingRecommended}
          error={errorRecommended}
          jobs={recommendedJobs}
        />
      )}
    </div>
  );
}

function SearchResults({ isLoading, error, jobs }: ResultsProps) {
  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <h2 className="text-lg font-semibold mb-2">Search Results</h2>
      <List columns={2}>
        {jobs.map((job: any) => (
          <JobCard key={job.job_id} job={job} />
        ))}
      </List>
    </>
  );
}

function RecommendedResults({ isLoading, error, jobs }: ResultsProps) {
  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      {jobs.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2">Recommended Jobs</h2>
          <List columns={2}>
            {jobs.map((job: any) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </List>
        </>
      )}
    </>
  );
}
