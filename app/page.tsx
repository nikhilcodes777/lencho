"use client";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { signUp, } = authClient
  const signin = async () => {
    const { data, error } = await signUp.email({
      email: "johndoe@gmail.com",
      password: "12345788", // user password -> min 8 characters by default
      name: "John Doe",
    }, {
      onRequest: (_ctx) => {
        //show loading
      },
      onSuccess: (_ctx) => {
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    })
  console.log(data,error)
  }
  return (
    <div>
      <button onClick={signin}>Hello</button>
    </div>
  );
}
