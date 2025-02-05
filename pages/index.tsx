import Head from "next/head";
import Image from "next/image";

import { CheckoutCard } from "../components";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-screen flex-col-reverse items-center bg-darkBlue p-10 sm:flex-row sm:justify-evenly sm:p-20">
      <Head>
        <link rel="icon" href="/icon.svg" />
      </Head>
      <div className="absolute bottom-0 mt-10 h-28 w-screen rounded-b-lg bg-darkerBlue sm:h-40"></div>
      <div className="mt-20 mb-12 sm:-mb-24 sm:mt-0">
        <Image
          src="/Illustration.svg"
          alt="logo"
          width={500}
          height={430}
          objectFit="contain"
        />
      </div>

      <div className="flex w-screen flex-col items-center sm:h-auto sm:w-auto sm:items-start">
        <CheckoutCard />
      </div>
    </div>
  );
}
