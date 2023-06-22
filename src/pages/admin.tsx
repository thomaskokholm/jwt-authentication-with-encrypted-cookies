import { decodeJwt } from "@/lib/auth";
import { USER_TOKEN } from "@/lib/constants";
import { getCookie } from "cookies-next";
import {
  InferGetServerSidePropsType,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { useEffect, useState } from "react";

export default function AdminPage({
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [settings, setSettings] = useState();
  useEffect(() => {
    async function getSettings() {
      try {
        const data = await fetch(
          "http://localhost:3000/api/admin/settings",
          {}
        ).then(async (res) => await res.json());
        setSettings(data);
        console.log("settings", settings);
      } catch (error) {
        console.error(error);
      }
    }
    getSettings();
  }, []);
  return <section>Admin (User Id: {userId})</section>;
}

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  /*  const token = getCookie(USER_TOKEN, { req, res }) as string;
  console.log("token", token); */
  let userId: string | undefined = "s";
  /* if (token) {
    const decodedJwt = await decodeJWT(token);
    console.log("decodedJwt", decodedJwt);
    userId = decodedJwt.sub;
  }
 */
  return { props: { userId } };
};
