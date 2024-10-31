"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Appointment } from "@/types/appwrite.types"
import StatusBadge from "../Badge/StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { doctors } from "../forms/AppointmentForm"
import AppointmentModal from "../Modal/AppointmentModal"


export const columns: ColumnDef<Appointment>[] = [
    
    {
        header: "#",
        cell: ({ row }) => {
            return <p className="font-medium ">{row.index + 1}</p>
        },
    },
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => {
            return <p className="font-medium">{row.original.patient.fullName}</p>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="">
                <StatusBadge status={row.original.status}/>
            </div>
        )
    },
    {
        accessorKey: "schedule",
        header: "Appointment",
        cell: ({ row }) => {
            const schedule = row.original.schedule
            return <p>{formatDateTime(schedule).dateTime}</p>
        }
    },
    {
        accessorKey: "primaryPhysician",
        header: "Doctor",
        cell: ({ row }) => {
            const doctor = doctors.find((d) => d.value === row.original.primaryPhysician);
            return <div>
                <p className="font-medium">{doctor?.label}</p>
            </div>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return <div className="flex items-center gap-2">
                < AppointmentModal type="schedule" userId={row.original.userId} patientId={row.original.patient.$id} appointment={row.original}/>
                < AppointmentModal type="cancel" userId={row.original.userId} patientId={row.original.patient.$id} appointment={row.original}/>
            </div>
        },
    },

]
