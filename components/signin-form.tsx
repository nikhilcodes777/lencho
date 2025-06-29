"use client";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 charactors password is required")
})

export default function SigninForm() {
  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }

  })
  const { signIn } = authClient
  const router = useRouter()
  const handleSubmit = async (values: z.infer<typeof SigninFormSchema>) => {
    const signinPromise = signIn.email(
      values,
      {

        onSuccess: () => {
          form.reset()
          toast.success("Signin success")
          router.push("/dashboard")

        },
        onError: (ctx) => {

          form.reset()
          toast.error(ctx.error.message, {

          })

        }
      }
    )
    toast.promise(signinPromise, {
      loading: "Signing in...",
    })

  };
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-card p-4 md:rounded-2xl md:p-8 ">
      <h2 className="text-xl font-bold ">
        Welcome Back!
      </h2>
      <p className="mt-2 max-w-sm text-sm ">
        Enter your email and password to login to your account.
      </p>

      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(handleSubmit)}>

          <FormField control={form.control}
            name="email"
            render={({ field }) =>
              <FormItem
                className="mb-4">

                <FormLabel htmlFor="email">Email Address</FormLabel>

                <FormControl>
                  <Input id="email" placeholder="heisenberg@breakinglabs.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control}
            name="password"
            render={({ field }) =>
              <FormItem
                className="mb-8">

                <FormLabel htmlFor="password">Password</FormLabel>

                <FormControl>
                  <Input id="password" placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />


          <Button
            className="w-full"
            type="submit"
          >
            Sign in &rarr;
          </Button>

        </form>
      </Form>

    </div>
  );
}


