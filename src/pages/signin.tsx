import { useRouter } from "next/router";

export default function SignInPage() {
  const router = useRouter();
  return (
    <section>
      Sign In Page
      <br />
      <button
        onClick={() => {
          fetch("/api/auth/signin", { method: "POST" }).then(() => {
            router.replace("/");
          });
        }}
      >
        Sign in
      </button>
    </section>
  );
}
