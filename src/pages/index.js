import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Banner from "@/Components/Banner";

export default function Home({ props }) {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <Head>
        <title>Workout Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Banner />
        <div className="flex flex-col justify-center items-center ">
          <div className="text-center mb-12 px-4">
            <h1>Track Workouts Easily</h1>
            <h3>
              Get a workout plan curated just for you created by our AI Personal
              trainer
            </h3>
            <h4>
              {" "}
              Chat With Vespur Our AI Trainer 24/7 For All Your Fitness
              Questions and Concerns
            </h4>
            <h5>View and Track your Personal Fitness Records at A Glance</h5>
          </div>
          <div className="flex flex-row justify-around w-96 mb-12">
            <i class="fas fa-dumbbell fa-3x fa-heartbeat"></i>
            <i class="fas fa-dumbbell fa-4x"></i>
            <i class="fas fa-dumbbell fa-3x"></i>
          </div>
          <div className="instructor-container">
            <div>
              <Image src="/aigreet.png" alt="mascot" width={250} height={250} />
            </div>
          </div>
          <div className="mt-6">
            <div>
              <h4>{`Hi! I'm Vespur, Your AI Fitness trainer`}</h4>
            </div>
            <div className="text-center">
              <h4>{`I'm here to help you get fit!`}</h4>
            </div>
            <div className="text-center">
              <h4>{`I'm Just A Chat Away`}</h4>
            </div>
            <div className="text-center">
              <h4>{`-.o`}</h4>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
