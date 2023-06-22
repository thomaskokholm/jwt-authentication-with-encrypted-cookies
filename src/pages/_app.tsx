import { Inter } from "next/font/google";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <header className="mx-auto max-w-screen-lg p-3">
        <nav>
          <ul className="flex gap-3">
            <li>
              <Link href="/" title="Home">
                <strong>Home</strong>
              </Link>
            </li>
            <li>
              <Link href="/admin" title="Admin" prefetch={false}>
                Admin
              </Link>
            </li>
            <li>
              <Link href="/signin" title="Sign In or Sign Up" prefetch={false}>
                Sign In or Sign Up
              </Link>
            </li>
            <li>
              <Link href="/signout" title="Sign Out" prefetch={false}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="max-w-screen-lg px-3 mx-auto">
        <Component {...pageProps} />
      </main>

      <footer className="mx-auto max-w-screen-lg p-3">
        Copyright &copy; {new Date().getFullYear()} - Thomas Kokholm
      </footer>
    </div>
  );
}
