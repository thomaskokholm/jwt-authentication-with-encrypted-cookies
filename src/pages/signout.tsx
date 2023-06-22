import { useRouter } from "next/router";

export default function SignInPage() {
  const router = useRouter();
  return (
    <section>
      Sign Out Page
      <br />
      <button
        onClick={() => {
          fetch("/api/auth/signout").then(() => {
            router.replace("/");
          });
        }}
      >
        Sign out
      </button>
    </section>
  );
}
