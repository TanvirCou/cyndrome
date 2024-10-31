import React from 'react'
import Image from 'next/image';
import appointmentLogo from "../../../public/appointment.png";
import pendingLogo from "../../../public/pending.png";
import cancelLogo from "../../../public/cancel.png";


const StatusBadge = ({status}: {status: string}) => {

    const statusIcon: any  = {
        scheduled: appointmentLogo,
        pending: pendingLogo,
        cancelled: cancelLogo
    };

    const statusBgColor: any = {
        scheduled: "bg-green-50",
        pending: "bg-blue-50",
        cancelled: "bg-red-50"
    };

    const statusTextColor: any = {
        scheduled: "text-green-600",
        pending: "text-blue-600",
        cancelled: "text-red-600"
    };

    let label;

    switch (status) {
        case "scheduled":
            label = "Scheduled";
            break;
        case "pending":
            label = "Pending";
            break;
        case "cancelled":
            label = "Cancelled";
            break;

        // Add more cases as needed for other appointment statuses.
        default:
            break;
    }


  return (
    <div className={`${statusBgColor[status]} w-fit py-3 px-6 rounded-full flex items-center gap-x-2`}>
        <Image src={statusIcon[status]} alt="status icon" height={16} width={16}  />
        <p className={statusTextColor[status]}>{label}</p>
    </div>
  )
}

export default StatusBadge