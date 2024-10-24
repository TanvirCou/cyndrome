import Image from 'next/image'
import React from 'react'
import heroPic from "../../../../../public/registration-pic.png";
import logo from "../../../../../public/stethoscope-icon-2316460_1280.webp";
import RegistrationForm from '@/components/forms/RegistrationForm';
import { getUser } from '@/actions/patient';

const RegistrationPage = async({params: {userId}}: SearchParamProps) => {
  const user = await getUser(userId);
  const uId = user?.$id as string;
  
  return (
    <div className="h-screen w-full bg-gray-50 ">
      <div className="flex w-full ">
        <div className="w-[60%] p-10">
          <div className="flex items-center gap-1">
            <Image src={logo} alt="logo" placeholder="blur" className="h-8 w-8 object-cover" />
            <p className="text-3xl font-bold font-[poppins] text-cyan-500">Cyndrome</p>
          </div>

          <div className="">
            <div className="py-8 px-[36px]">
              <p className="text-3xl font-medium pb-2">Welcome,</p>
              <p className='text-gray-500 text-sm'>Let us know more about you</p>
            </div>

            
            <RegistrationForm userId={uId}/>
          </div>

          <div>
            <p className="text-sm font-semibold pt-8">© {new Date().getFullYear()} Cyndrome</p>
          </div>
        </div>

        <div className="w-[40%] h-screen flex justify-center items-center overflow-y-hidden">
          <div className=" w-[35%] fixed" >
            <Image src={heroPic} placeholder="blur" alt="registration-picture" className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage