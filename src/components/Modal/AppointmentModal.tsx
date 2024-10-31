import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import AppointmentForm from '../forms/AppointmentForm'
import { Appointment } from '@/types/appwrite.types'

type AppointmentProps = {
    type: "schedule" | "cancel",
    userId: string
    patientId: string,
    appointment: Appointment
}
  

const AppointmentModal = ({type, userId, patientId, appointment}: AppointmentProps) => {
    const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
  <DialogTrigger asChild>
    <Button className={`${type === "schedule" ? "bg-green-500 " : "bg-red-500"} px-2 py-1`}>{type === "schedule" ? "Schedule" : "Cancel"}</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader className='w-full flex flex-col items-center'>
      <DialogTitle>{type === "schedule" ? "Schedule" : "Cancel"} Appointmanet</DialogTitle>
      <DialogDescription className='text-xs'>
        Please fill up the following form to {type === "schedule"? "schedule" : "cancel"} an appointment.
      </DialogDescription>
    </DialogHeader>

    <AppointmentForm type={type} userId={userId} patientId={patientId} appointment={appointment} setOpen={setOpen}/>
  </DialogContent>
</Dialog>

  )
}

export default AppointmentModal