import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const calculateTimeDifference = (server, client) => {
  const timeDiff = Math.abs(server - client);
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

export default function Home({ serverTime }) {
  const router = useRouter();
  const [clientTime, setClientTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setClientTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const moveToTaskManager = () => {
    router.push("/tasks");
  };

  const serverDate = new Date(serverTime);

  const timeDiff = calculateTimeDifference(serverDate.getTime(), clientTime.getTime());

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          <p>
            Server time: <span className="serverTime">{serverTime}</span>
          </p>
          <p>
            Time diff: <span className="serverTime">{timeDiff}</span>
          </p>
        </div>
        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const serverTime = new Date().toLocaleString();
  return {
    props: {
      serverTime,
    },
  };
}
