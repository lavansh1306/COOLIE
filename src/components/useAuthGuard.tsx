"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

type Role = "passenger" | "porter" | "admin";

export function useAuthGuard(roles: Role[], redirectTo: string) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !roles.includes(user.role))) {
      router.replace(redirectTo);
    }
  }, [loading, redirectTo, roles, router, user]);

  const authorized = Boolean(user && roles.includes(user.role));

  return { user, loading, authorized };
}