"use client";
import Link from "next/link";
import Button from "../Button";

export default function Header() {
  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between mb-6">
      <Link href={"/"}>
        <h1 className="text-xl font-bold text-gray-800">Job Search</h1>
      </Link>
      <div className="space-x-4">
        <Link href="/liked">
          <Button>Liked</Button>
        </Link>
        <Link href="/create-profile">
          <Button>Create Profile</Button>
        </Link>
      </div>
    </header>
  );
}
