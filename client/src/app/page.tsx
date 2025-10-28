"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/services/auth.service";
import LandingPage from "@/components/UI/LandingPage/LandingPage";
import Loading from "./loading";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const loggedIn = isLoggedIn();
      setUserLoggedIn(loggedIn);

      if (loggedIn) {
        // Redirect authenticated users to main dashboard page in route group
        router.replace("/"); // This will show (dashboard)/page.tsx for logged-in users
        return;
      }
      
      // Show landing page for new visitors
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  // Show landing page for unauthenticated users
  return <LandingPage />;
}
