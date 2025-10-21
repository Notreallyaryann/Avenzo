import Image from 'next/image'
import banner from '../../../../public/banner2.jpg'
import logo from '../../../../public/logo1.png'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#fff6f4] flex">

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
<form className='space-y-4'>

  <div className='space-y-1'>



  </div>  
  <div className='space-y-1'>
    <Label htmlFor='name'>Email</Label>
    <Input
    id="email"
    name="email"
    type="email"
    placeholder='Enter Your Email'
    required
    className='bg-[#ffede1]'
    />


  </div>
  <div className='space-y-1'>
    <Label htmlFor='name'>Password</Label>
    <Input
    id="password"
    name="password"
    type="text"
        className='bg-[#ffede1]'
    placeholder='Enter Your Password'
    required
    
    />


  </div>
  <Button type='submit' className='w-full bg-black text-white hover:bg-black transition-colors'>
     LOGIN

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
  )
}

export default LoginPage
