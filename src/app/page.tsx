import Image from "next/image";
import heroPic from "../../public/hero-pic.webp";
import PatientForm from "@/components/forms/PatientForm";
import logo from "../../public/main-logo.webp";
import Link from "next/link";
import Passkey from "@/components/Modal/Passkey";


export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";


  return (
    <div className="md:h-screen w-full bg-gray-50">
      {isAdmin && <Passkey />}

      <div className="flex items-center gap-1 md:hidden p-5 border-b">
        <Image src={logo} alt="logo" placeholder="blur" className="h-8 w-8 object-cover" />
        <p className="text-3xl font-bold font-[poppins] text-cyan-500">Cyndrome</p>
      </div>

      <div className="flex flex-col-reverse md:flex-row w-full">
        <div className="w-full md:w-[60%] lg:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
          <div className="md:flex items-center gap-1 hidden ">
            <Image src={logo} alt="logo" placeholder="blur" className="h-8 w-8 object-cover" />
            <p className="text-3xl font-bold font-[poppins] text-cyan-500">Cyndrome</p>
          </div>

          <div className="">
            <div className="py-6 md:pb-8 px-[15px] md:px-[20px] lg:px-[48px] xl:px-[60px]">
              <p className="text-2xl md:text-4xl font-medium pb-2">Hi There,</p>
              <p className="text-sm md:text-md">Schedule your first appointment</p>
            </div>
            <PatientForm />
          </div>

          <div className="py-6 md:py-0 flex items-center justify-around">
            <p className="text-xs font-semibold">© {new Date().getFullYear()} Cyndrome</p>
            <Link href="/?admin=true" className="text-xs font-semibold">Admin</Link>
          </div>
        </div>
        <div className="w-full md:w-[40%] lg:w-1/2 md:h-screen overflow-y-hidden ">
          <div className="h-full w-full flex justify-center items-center">
            <Image src={heroPic} placeholder="blur" alt="hero-picture" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
