"use client";

import { useState } from "react";
import Link from "next/link"; //  Next.js Link
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AuthLayout from "@/components/ui/AuthLayout";
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/config";
const SignIn = () => {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", formData);
    try{

        const response=await axios.post(`${BACKEND_URL}/user/signin`,{
            username: formData.username,
            password: formData.password,
        }
        )
        if(response.status === 200) {
          alert("Sign in successful!");
          // Redirect or perform further actions
            window.localStorage.setItem('token', response.data.token);
            router.push('/dashboard');
        }
    }
    catch(e){
        console.error("Sign in error:", e);
        alert("Sign in failed. Please check your credentials and try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue monitoring your sites"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="usernname"
            name="username"
            type="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:text-primary-hover"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Sign In
        </Button>

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-card px-2 text-xs text-muted-foreground">OR</span>
          </div>
        </div>

        <Button type="button" variant="outline" className="w-full" size="lg">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:text-primary-hover font-medium">
            Sign up for free
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
