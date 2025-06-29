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
const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

const SignupFormSchema = z.object({
  firstname: z.string().trim().min(2, "Too short"),
  lastname: z.string().trim().optional(),
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 charactors password is required"),
  confirmpassword: z.string().min(8, "Minimum 8 charactors password is required")
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords do not match",
  path: ["confirmpassword"], 
});
export default function SignupForm() {
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: ""
    }

  })

  const { signUp } = authClient
  const router = useRouter()
  const handleSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    const data = {
      name: values.lastname
        ? `${capitalize(values.firstname)} ${capitalize(values.lastname)}`
        : values.firstname,
      email: values.email,
      password: values.password
    }
    const signinPromise = signUp.email(
      data,
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
  }
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-card p-4 md:rounded-2xl md:p-8 ">
      <h2 className="text-xl font-bold ">
        Welcome to Lencho
      </h2>
      <p className="mt-2 max-w-sm text-sm ">
        Enter your credentials
      </p>

      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">

            <div className="flex flex-col flex-1">
              <FormField control={form.control}
                name="firstname"
                render={({ field }) => <FormItem>
                  <FormLabel htmlFor="firstname">First name</FormLabel>

                  <FormControl>
                    <Input id="firstname" placeholder="Walter" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            </div>
            <div className="flex flex-col flex-1">
              <FormField control={form.control}
                name="lastname"
                render={({ field }) => <FormItem>

                  <FormLabel htmlFor="lastname">Last name</FormLabel>

                  <FormControl>
                    <Input id="lastname" placeholder="White" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            </div>
          </div>

          <FormField control={form.control}
            name="email"
            render={({ field }) =>
              <FormItem
                className="mb-4">

                <FormLabel htmlFor="email">Email Address</FormLabel>

                <FormControl>
                  <Input id="email" placeholder="walter@white.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control}
            name="password"
            render={({ field }) =>
              <FormItem
                className="mb-4">

                <FormLabel htmlFor="password">Password</FormLabel>

                <FormControl>
                  <Input id="password" placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control}
            name="confirmpassword"
            render={({ field }) => <FormItem
              className="mb-8">
              <FormLabel htmlFor="confirmpassword">Confirm your password</FormLabel>

              <FormControl>
                <Input id="confirmpassword" placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />

          <Button
            className="w-full"
            type="submit"
          >
            Sign up &rarr;
          </Button>
        </form>
      </Form>
    </div>
  );
}


