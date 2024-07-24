"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  async function handleonSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setError(false);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) setError(true);
      if (response.ok) setUserCreated(true) ;
      setCreatingUser(false);
    } catch (e) {
      setError(true);
    }
  }

  return (
    <section className="mt-8 flex min-h-screen flex-col items-center py-12 lg:px-24 lg:max-w-screen-xl mx-auto">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User Created. <br /> Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An Error has occurred <br /> please try again later!
        </div>
      )}
      <form
        className="block max-w-xs mx-auto lg:w-80"
        onSubmit={handleonSubmit}
      >
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
          className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
          className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
        />
        <button
          type="submit"
          disabled={creatingUser}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          className="flex items-center gap-4 justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-md"
          onClick={() => ""}
        >
          <Image src={"/google.png"} alt="" width={24} height={24} />
          <span>Login with Google</span>
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
