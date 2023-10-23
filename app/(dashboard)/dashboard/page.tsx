"use client";

import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <main>
      Welcome to your Dashboard, Dear User.
      <button onClick={() => signOut()}>log out</button>
    </main>
  );
}
