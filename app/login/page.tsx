"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
//import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginProgress(true);
    await signIn("credentials", { email, password, callbackUrl:"/" });
    setLoginProgress(false);
  }

  async function handleLoginSubmit(){
    //e.preventDefault();
    // const res =  await fetch('/api/login',{
    //   method: "POST",
    //   body: JSON.stringify({email, password}),
    //   headers: { "Content-Type": "application/json" },
    // })
    // if(res.ok){
    //   const call = res.json()
    //   console.log("call",call)
    // }

  }
  return (
    <section className="mt-8 h-[100vh]">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginProgress}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginProgress}
        />
        <button type="submit" disabled={loginProgress} 
        //onClick={() => handleLoginSubmit()}
        >
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" className="flex gap-4 justify-center" 
        //onClick={() => signIn('google', {callbackUrl: "/"})}
        >
          <Image src={"/google.png"} alt="" width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}
