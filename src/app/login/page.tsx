import LoginPageClient from "@/components/LoginPageClient";

export default async function LoginPage({ searchParams }: { searchParams?: Promise<{ role?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const role = resolvedSearchParams?.role === "porter" || resolvedSearchParams?.role === "admin" ? resolvedSearchParams.role : "passenger";

  return <LoginPageClient initialRole={role} />;
}
