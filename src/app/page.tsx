// import Profile from "@/views/Profile";

// export default function Home() {
//   return (
//     <>
//       <Profile />
//     </>
//   );
// }

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Index from "@/views/Profile/index";

export default function CustomerProfilesPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      router.replace("/sign-in"); // redirect if not logged in
    }
  }, [router]);

  return <Index />; // your actual component
}
