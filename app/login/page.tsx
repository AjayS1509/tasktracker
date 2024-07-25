"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
//import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);

  function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(email.length != 0 && password.length != 0){
      if(validateEmail(email)){
        setLoginProgress(true);
    await signIn("credentials", { email, password, callbackUrl:"/" });
    setLoginProgress(false);
      }else{
        toast.error("Email is not Valid!")
      }
    }else{
      if(email.length == 0 && password.length == 0){
        toast.error("Please enter email and password!")
      }else if(email.length  == 0){
        toast.error("Please enter the Email id!")
      }else {
        toast.error("Please enter the password!")
      }
    }
    
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
        <button type="submit" className="flex justify-center w-full mt-5" disabled={loginProgress} 
        //onClick={() => handleLoginSubmit()}
        >
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" className="flex gap-4 justify-center w-full" 
        onClick={() => signIn('google', {callbackUrl: "/"})}
        >
          <Image src={"/google.png"} alt="" width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}
