"use client";
import Link from "next/link";
import { FormEvent, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie'; // You'll need to install this: npm install js-cookie @types/js-cookie

const LoginPage = () => {
  const { toast } = useToast();
   
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const rememberMe = formData.get('remember') === 'on';
    
    if (rememberMe) {
      Cookies.set('shareBiteEmail', email, { expires: 7 });
      Cookies.set("shareBitePswd", password, { expires: 7 }); // Expires in 7 days
    } else {
      Cookies.remove('shareBiteEmail');
      Cookies.remove("shareBitePswd");
    }
    
    // Here you would typically:
    // 1. Send credentials to your backend
    // 2. Receive a session token or JWT
    // 3. Store that token in cookies or localStorage
    
    toast({
      title: "Login Successful",
      description: "You have successfully logged in.",
    });
  };

  // Check for remembered email when component mounts
  useEffect(() => {
    const rememberedEmail = Cookies.get('shareBiteEmail');
    if (rememberedEmail) {
      const emailInput = document.getElementById('email') as HTMLInputElement;
      if (emailInput) {
        emailInput.value = rememberedEmail;
      }
    }

    const rememberedPswd = Cookies.get('shareBitePswd');
    if (rememberedPswd) {
      const pswdInput = document.getElementById('password') as HTMLInputElement;
      if (pswdInput) {
        pswdInput.value = rememberedPswd;
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="mr-2"
            />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            Login
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
