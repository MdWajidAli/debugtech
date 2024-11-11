"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [isClient, setIsClient] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 }, undefined, (match) => {
    if (match !== undefined) setIsClient(true);
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setSubscriptionStatus(data.message);
      setEmail("");
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="p-4 flex justify-between items-center px-12">
        <div className="flex items-center">
          <Image
            src="/debug-light.jpg?height=80&width=80"
            alt="Debug Tech Logo"
            width={80}
            height={80}
            className="mr-2"
          />
          {/* <h1 className="text-2xl font-bold">Debug Tech</h1> */}
        </div>
        {/* <button className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button> */}
      </header>

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-250px)]  flex items-center">
        <div
          className={`container mx-auto px-4 ${
            isDesktop ? "flex items-center" : ""
          }`}
        >
          {isDesktop ? (
            <>
              <div className="w-1/2 pr-8">
                <h2 className="text-4xl font-bold mb-4">Empower Your Tech with DebugTech</h2>
                <p className="mb-8">
                  We specialize in creating custom software tailored to your needs
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    required
                  />
                  <br />
                  <button
                    type="submit"
                    className=" bg-slate-300 text-black p-2 rounded duration-300 hover:text-white hover:bg-slate-900"
                  >
                    Subscribe
                  </button>
                </form>
                {subscriptionStatus && (
                  <p className="mt-4 text-sm">{subscriptionStatus}</p>
                )}
              </div>
              <div className="w-1/2">
                <Image
                  src="/hero-image.jpg?height=400&width=600"
                  alt="Debug Tech Abstract Design"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <Image
                  src="/hero-image.jpg?height=400&width=600"
                  alt="Debug Tech Abstract Design"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-pink-50 p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-4">
                  Subscribe to Newsletter
                </h2>
                <p className="mb-4">
                  Get the latest debugging tips and tricks delivered to your
                  inbox!
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-coral-500 text-white p-2 rounded hover:bg-coral-600"
                  >
                    Subscribe
                  </button>
                </form>
                {subscriptionStatus && (
                  <p className="mt-4 text-sm">{subscriptionStatus}</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 mb-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            About Debug Tech
          </h2>
          <div
            className={`${
              isDesktop ? "flex items-center gap-12" : "space-y-8"
            }`}
          >
            <div className={isDesktop ? "w-1/2" : "w-full"}>
              <Image
                src="/abtimg.webp?height=400&width=600"
                alt="Technical Pattern"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className={isDesktop ? "w-1/2" : "w-full"}>
              <h3 className="text-2xl font-bold mb-4">Our History</h3>
              <p className="text-gray-700 mb-4">
                Debug Tech was founded in 1997 as a coaching center in
                Hyderabad, India. We probably were too early for our time and
                did not have the appetite to keep putting money into the
                business at the time, so we gave up some time.The one that got
                away needed closure, so we decided to give it another shot, and
                we are back.
              </p>
              <p className="text-gray-700">
                Over the years, we have grown into a leading software
                development company, serving clients in a wide range of
                industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-50 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Stay Updated with Debug Tech
          </h2>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className=" bg-slate-300 text-black p-2 rounded duration-300 hover:text-white hover:bg-slate-900"
              >
                Subscribe to Newsletter
              </button>
            </form>
            {subscriptionStatus && (
              <p className="mt-4 text-sm">{subscriptionStatus}</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/debug-dark.png?height=40&width=40"
                alt="Debug Tech Logo"
                width={80}
                height={80}
                className="mr-2"
              />
              {/* <span className="text-xl font-bold">Debug Tech</span> */}
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2024 Debug Tech. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
