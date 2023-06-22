# JWT Authentication with encrypted cookies

This is an example Next.js application with custom implemented authentication. It is based on JWT (JSON Web Tokens) using the [jose](https://github.com/panva/jose) lib. The token is encrypted using using [HKDF](https://github.com/panva/hkdf) (a HMAC Key derivation function) and stored in a cookie.

## Getting Started

Install dependencies:

```bash
npm run dev
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
