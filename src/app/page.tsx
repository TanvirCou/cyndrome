import Image from "next/image";
import heroPic from "../../public/images/doctor-6810751_1280.webp";
import PatientForm from "@/components/forms/PatientForm";
import logo from "../../public/stethoscope-icon-2316460_1280.webp";
import Link from "next/link";
import Passkey from "@/components/Modal/Passkey";


export default function Home({searchParams}: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";
  

  return (
    <div className="h-screen w-full bg-gray-50">
      {isAdmin && <Passkey />}
      <div className="flex w-full">
        <div className="w-1/2 p-10 flex flex-col justify-between">
          <div className="flex items-center gap-1">
            <Image src={logo} alt="logo" placeholder="blur" className="h-8 w-8 object-cover" />
            <p className="text-3xl font-bold font-[poppins] text-cyan-500">Cyndrome</p>
          </div>

          <div className="">
            <div className="pb-8 px-[60px]">
              <p className="text-4xl font-medium pb-2">Hi There,</p>
              <p>Schedule your first appointment</p>
            </div>
            <PatientForm />
          </div>

          <div className="flex items-center justify-around">
            <p className="text-xs font-semibold">© {new Date().getFullYear()} Cyndrome</p>
            <Link href="/?admin=true" className="text-xs font-semibold">Admin</Link>
          </div>
        </div>
        <div className="w-1/2 h-screen overflow-y-hidden">
          <div className="h-full w-full flex justify-center items-center">
            <Image src={heroPic} placeholder="blur" alt="hero-picture" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
