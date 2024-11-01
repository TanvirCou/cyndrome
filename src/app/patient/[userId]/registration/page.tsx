import Image from 'next/image'
import React from 'react'
import heroPic from "../../../../../public/registration-pic.png";
import logo from "../../../../../public/main-logo.webp";
import RegistrationForm from '@/components/forms/RegistrationForm';
import { getUser } from '@/actions/patient';
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyndrome | Registration",
  description: "A health care management system",
};

const RegistrationPage = async({params: {userId}}: SearchParamProps) => {
  const user = await getUser(userId);
  const uId = user?.$id as string;
  
  return (
    <div className="h-screen w-full bg-gray-50 ">
      <div className="lg:flex w-full ">
        <div className="w-full lg:w-[60%] p-6 md:p-8 lg:p-10">
          <Link href="/" className="flex items-center gap-1">
            <Image src={logo} alt="logo" placeholder="blur" className="h-8 w-8 object-cover" />
            <p className="text-3xl font-bold font-[poppins] text-cyan-500">Cyndrome</p>
          </Link>

          <div className="">
            <div className="py-8 px-[10px] md:px-[26px] lg:px-[28px] xl:px-[36px]">
              <p className="text-2xl md:text-3xl font-medium pb-2">Welcome,</p>
              <p className='text-gray-500 text-sm'>Let us know more about you</p>
            </div>

            
            <RegistrationForm userId={uId}/>
          </div>

          <div className='w-full flex justify-center'> 
            <p className="text-sm font-semibold pt-8">© {new Date().getFullYear()} Cyndrome</p>
          </div>
        </div>

        <div className="w-[40%] h-screen hidden lg:flex justify-center items-center overflow-y-hidden">
          <div className=" w-[35%] fixed" >
            <Image src={heroPic} placeholder="blur" alt="registration-picture" className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage