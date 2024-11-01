import React from 'react'
import Image from 'next/image'
import logo from "../../../../../../public/main-logo.webp";
import success from "../../../../../../public/success-gif.gif";
import { getAppointment } from '@/actions/appointments';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import calendarPic from "../../../../../../public/calendar-icon.jpg"

const page = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);



    return (
        <div className='w-full '>
            <div className='w-full flex flex-col items-center py-4'>
                <Link href="/" className="flex items-center gap-1">
                    <Image src={logo} alt="logo" placeholder="blur" className="h-8 w-8 object-cover" />
                    <p className="text-3xl font-bold font-[poppins] text-cyan-500">Cyndrome</p>
                </Link>

                <div className='py-2'>
                    <Image src={success} alt="success" className="w-full h-56 object-cover" />
                </div>

                <div className='text-center'>
                    <p className='text-xl font-medium'>Your <span className='text-cyan-500'>appointment request</span> has <br /> been successfully submitted</p>
                    <p className='text-xs py-2'>We will be in touch shortly to confirm</p>
                </div>

                <div className='md:flex items-center text-center text-xs font-medium gap-x-10 py-6'>
                    <p>Requested appointment details:</p>
                    <div className='py-2 md:py-0'>
                        <p>{appointment?.primaryPhysician}</p>
                    </div>
                    <div className='flex items-center'>
                        <Image src={calendarPic} alt="calendar" className="h-7 w-7" />
                        <p>{formatDateTime(appointment?.schedule).dateTime}</p>
                    </div>
                </div>

                <Button className='bg-cyan-500'>
                    <Link href={`/patient/${userId}/new-appointment`}>New Appointment</Link>
                </Button>

                <div>
                    <p className="text-xs font-semibold pt-8">© {new Date().getFullYear()} Cyndrome</p>
                </div>
            </div>
        </div>
    )
}

export default page;
