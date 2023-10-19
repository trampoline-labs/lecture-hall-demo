"use client";

import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main>
      Welcome, Dear User.
      <button onClick={() => signOut()}>log out</button>
    </main>
  );
}
