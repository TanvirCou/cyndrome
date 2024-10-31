import Image, { StaticImageData } from 'next/image';
import React from 'react'

type StatCardProps = {
    label: string;
    count: number;
    icon: StaticImageData;
}

const StatCard = ({label, count, icon}: StatCardProps) => {
  return (
    <div className='border w-[280px] px-4 py-4 rounded shadow-md'>
        <div className='flex items-center gap-x-2'>
            <Image
                src={icon}
                alt={label}
                width={22}
                height={22}
            />
            <p className='text-2xl italic '>{count}</p>
        </div>
        <p className='text-sm text-gray-500 font-medium py-1'>{label}</p>
    </div>
  )
}

export default StatCard