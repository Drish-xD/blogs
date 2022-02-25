import Head from "next/head";
import Image from "next/image";

export default function Custom404() {
  return (
    <div className="container mx-auto mb-8 px-6 lg:px-10">
      <Head>
        <title>Page Not Found</title>
        <meta name="description" content="Error 404!!! Page Not Found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto flex justify-center items-center flex-col">
        <Image
          src="/Images/404.png"
          alt="404"
          width="600"
          height="600"
          loading="lazy"
        />
      </div>
    </div>
  );
}
