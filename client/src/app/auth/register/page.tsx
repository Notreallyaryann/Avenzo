"use client"

import { useState } from "react"
import { toast } from "sonner"      
import { Toaster } from "@/components/ui/sonner"  
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import banner from '../../../../public/banner2.jpg'
import logo from '../../../../public/logo1.png'
import { protectSignInAction } from "@/actions/auth"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"


const Registerpage = () => {
  const [formdata, setFromData] = useState({ name: '', email: '', password: '' })
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromData(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const check = await protectSignInAction(formdata.email)

    if (!check.success) {
      toast.error(check.error || "Something went wrong")
      return
    }

    toast.success("Account created successfully!")

    const userId=await register(formdata.name,formdata.email,formdata.password)
    if(userId) router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-[#fff6f4] flex">
      <Toaster />  

      <div className="hidden lg:block w-1/2 bg-[#ffede1] relative overflow-hidden">
        <Image
          src={banner}
          alt="Register"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </div>

      <div className='w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-center'>
        <div className='max-w-md w-full mx-auto'>
          <div className='flex justify-center'>
            <Image src={logo} width={200} height={50} alt="Logo" />
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-1'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder='Enter Your Name'
                className='bg-[#ffede1]'
                required
                value={formdata.name}
                onChange={handleOnChange}
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder='Enter Your Email'
                required
                className='bg-[#ffede1]'
                value={formdata.email}
                onChange={handleOnChange}
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                className='bg-[#ffede1]'
                placeholder='Enter Your Password'
                required
                value={formdata.password}
                onChange={handleOnChange}
              />
            </div>

            <Button type='submit' 
            disabled={isLoading}
            className='w-full bg-black text-white hover:bg-black transition-colors'>
           {
              isLoading? 'Creating Account...' : 
              <>
              CREATE ACCOUNT 
              <ArrowRight className="w-4 h-4ml-2"/>
              </>
           }
            </Button>

            <p className="text-center text-[#3f3d56] text-sm">
              Already have an account{" "}
              <Link href={"/auth/login"} className="text-[#000] hover:underline font-bold">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registerpage


