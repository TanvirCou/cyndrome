import Image from 'next/image';
import React from 'react'
import logo from "../../../public/stethoscope-icon-2316460_1280.webp";
import StatCard from '@/components/StatCard/StatCard';
import appointmentLogo from "../../../public/appointment.png";
import pendingLogo from "../../../public/pending.png";
import cancelLogo from "../../../public/cancel.png";
import { getRecentAppointmentList } from '@/actions/appointments';
import { DataTable } from '@/components/table/data-table';
import { columns} from '@/components/table/columns';
import Link from 'next/link';



const page = async() => {
  const appointments = await getRecentAppointmentList();
  
  return (
    <div>
      <div className='px-20 py-3 flex items-center justify-between border border-b'>
        <Link href="/" className="flex items-center gap-1">
          <Image src={logo} alt="logo" placeholder="blur" className="h-6 w-6 object-cover" />
          <p className="text-2xl font-bold font-[poppins] text-cyan-500">Cyndrome</p>
        </Link>
        <p className='text-sm font-medium'>Admin Dashboard</p>
      </div>

      <div className='px-20 py-2'>
        <p className='font-semibold text-3xl'>Welcome</p>
        <p className='text-xs font-medium text-gray-500 pt-1'>Start the day with managing new appointments</p>
      </div>

      <div className='px-20 flex items-center justify-between py-4'>
        <StatCard 
          label="Scheduled appointments" 
          count={appointments?.scheduledCount!}
          icon={appointmentLogo}
        />
        <StatCard 
          label="Pending appointments"  
          count={appointments?.pendingCount!}
          icon={pendingLogo}
        />
        <StatCard 
          label="Cancelled appointments"  
          count={appointments?.cancelledCount!}
          icon={cancelLogo}
        />
      </div>

      <div className='px-20 pt-2'>
      <DataTable columns={columns} data={appointments?.documents!} />
      </div>
    </div>
  )
}

export default page;