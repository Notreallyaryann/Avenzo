"use client";

import Image from "next/image";
import banner from "../../../../public/banner2.jpg";
import logo from "../../../../public/logo1.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { protectSignInAction } from "@/actions/auth";
import { ArrowRight } from "lucide-react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    console.log("Login form submitted"); // Add debug log
    
    const checkFirstLevelOfValidation = await protectSignInAction(formData.email);

    if (!checkFirstLevelOfValidation.success) {
      console.log("Validation failed:", checkFirstLevelOfValidation.error);
      toast.error(checkFirstLevelOfValidation.error || "Something went wrong");
      return;
    }

    console.log("Calling login function...");
    const success = await login(formData.email, formData.password);
    
    if (success) {
      console.log("Login successful, showing toast");
      toast.success("Login Successful!");
      const user = useAuthStore.getState().user;
      if (user?.role === "SUPER_ADMIN") router.push("/super-admin");
      else router.push("/home");
    } else {
      console.log("Login failed");
      // Add error toast for login failure
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff6f4] flex">
      {/* Remove Toaster from here since it's in root layout */}
      
      <div className="hidden lg:block w-1/2 bg-[#ffede1] relative overflow-hidden">
        <Image
          src={banner}
          alt="Login"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center">
            <Image 
              src={logo} 
              width={200} 
              height={50} 
              alt="Logo"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="bg-[#ffede1]"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleOnChange}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="bg-[#ffede1]"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleOnChange}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-black text-white hover:bg-black transition-colors"
            >
              {isLoading ? (
                'Logging in...'
              ) : (
                <>
                  LOGIN
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            <p className="text-center text-[#3f3d56] text-sm">
              New here{" "}
              <Link
                href={"/auth/register"}
                className="text-[#000] hover:underline font-bold"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;