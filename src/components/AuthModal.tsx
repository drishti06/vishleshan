import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUrlParam } from "@/hooks/useUrlParams";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { mockLogin, mockSignup } from "@/lib/store/user-slice";
import { useAppDispatch } from "@/lib/store/hooks";

// const formSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   password: z.string().min(4, {
//     message: "Password is required.",
//   }),
// });

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export function AuthModal() {
  // type FormData = z.infer<typeof formSchema>;
  const [isLogin, setIsLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useAppDispatch();

  const authParam = useUrlParam("auth");
  const redirectParams = useUrlParam("redirect");
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(authParam === "login");

    // Check for stored credentials when component mounts
    const storedCredentials = localStorage.getItem("rememberedCredentials");
    if (storedCredentials) {
      const { email, password } = JSON.parse(storedCredentials);
      form.setValue("email", email);
      form.setValue("password", password);
      setRememberMe(true);
    }
  }, [authParam]);

  const form = useForm<FormData>({
    resolver: async (values, context, options) => {
      const formSchema = z.object({
        name:
          authParam == "login"
            ? z.string()
            : z.string().min(1, { message: "Name is required." }),
        phone:
          authParam == "login"
            ? z.string()
            : z.string().min(10, { message: "Phone number is required." }),
        email: z.string().email({
          message: "Please enter a valid email address.",
        }),
        password: z.string().min(4, {
          message: "Password is required.",
        }),
      });
      return zodResolver(formSchema)(values, context, options);
    },
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  });
  const handleLogin = async (data: FormData) => {
    const res = await dispatch(
      mockLogin({ email: data.email, password: data.password })
    );
    if (res.meta.requestStatus === "fulfilled") {
      // Get redirect path
      const redirectPath =
        res?.payload?.authority == "ROLE_ADMIN"
          ? "/admin"
          : redirectParams
          ? redirectParams
          : "/";
      // Navigate after login
      navigate(decodeURIComponent(redirectPath));
      setIsOpen(false);
      return <Navigate to={decodeURIComponent(redirectPath)} replace />;
    } else {
      const errorMsg =
        res?.payload?.error?.response?.data?.message || res.payload;
      toast.error(errorMsg || "Something went wrong.", {
        position: "top-center",
      });
    }
  };

  async function onSubmit(values: FormData) {
    // Handling remember me functionality
    if (isLogin) {
      if (rememberMe) {
        localStorage.setItem(
          "rememberedCredentials",
          JSON.stringify({
            email: values.email,
            password: values.password,
          })
        );
      } else {
        localStorage.removeItem("rememberedCredentials");
      }

      // Handle form submission
      handleLogin(values);
    } else {
      try {
        const res = await dispatch(
          mockSignup({
            name: values.name,
            phone: values.phone,
            email: values.email,
            password: values.password,
          })
        );

        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Account created successfully!", {
            position: "top-center",
          });
          setIsLogin(true);
        } else {
          toast.error("Failed to create account.", { position: "top-center" });
        }
      } catch (error) {
        toast.error("An unexpected error occurred.", {
          position: "top-center",
        });
      }
    }
  }

  const closeLoginModal = () => {
    window.history.pushState({}, "", window.location.pathname);
    setIsOpen(false);
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
    if (!checked) {
      localStorage.removeItem("rememberedCredentials");
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-40 inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white relative rounded-xl mt-[8%] overflow-hidden min-w-[400px] p-8">
        <XIcon
          className="absolute top-4 right-4 w-6 h-6 text-gray-500 cursor-pointer"
          onClick={closeLoginModal}
        />
        <div className="flex justify-center mb-6">
          <h1>Logo</h1>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {isLogin ? (
            <motion.div
              key="login"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">Welcome back</h2>
                  <p className="text-sm text-gray-500">
                    Please enter your details to sign in.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={handleRememberMeChange}
                        />
                        <label htmlFor="remember" className="text-sm">
                          Remember me
                        </label>
                      </div>
                      <button className="text-sm text-primary hover:underline">
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#776e45] text-white hover:bg-[#776e45]/90"
                    >
                      Sign in
                    </Button>
                  </form>
                </Form>

                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-[#776e45] hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">Create an account</h2>
                  <p className="text-sm text-gray-500">
                    Please enter your details to sign up.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your name..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-[#776e45] text-white hover:bg-[#776e45]/90"
                    >
                      Create account
                    </Button>
                  </form>
                </Form>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
