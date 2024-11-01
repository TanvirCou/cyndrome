"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import 'react-phone-number-input/style.css'
import { useRouter } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react"
import { Textarea } from "../ui/textarea"
import { createAppointment, updateAppointment } from "@/actions/appointments"
import { Appointment } from "@/types/appwrite.types"
import Image from "next/image"
import calendarPic from "../../../public/calendar-icon.jpg";

export const doctors = [{ label: "Dr. John Doe", value: "dr.johndoe" }, { label: "Dr. Jane Smith", value: "dr.janesmith" }];

const formSchema = z.object({
    primaryPhysician: z.string({ required_error: "You need to select primary physician." }),
    appointmentReason: z.string().min(5, { message: "Reason must be at least 5 characters." }).max(200, { message: "Reason must be lower than 200 characters" }),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
    schedule: z.date({ required_error: "You need to select an appointment date." })
})


const AppointmentForm = ({ userId, patientId, type, appointment, setOpen }: { userId: string, patientId: string, type: "create" | "cancel" | "schedule", appointment?: Appointment, setOpen?: (open: boolean) => void }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            primaryPhysician: appointment ? appointment.primaryPhysician : "",
            schedule: appointment ? new Date(appointment.schedule)! : new Date(Date.now())!,
            appointmentReason: appointment ? appointment.reason : "",
            note: appointment ? appointment.note : "",
            cancellationReason: appointment?.cancellationReason || "",
        },
    })

    const { isSubmitting } = form.formState;
    const router = useRouter();

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        let status;
        switch (type) {
            case "cancel":
                status = "cancelled";
                break;
            case "schedule":
                status = "scheduled";
                break;
            default:
                status = "pending";
                break;
        }

        try {
            if (type === "create" && patientId) {
                const appointmentData = {
                    userId: userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    reason: values.appointmentReason,
                    schedule: new Date(values.schedule),
                    status: status as Status,
                    note: values.note
                }
                const newAppointment = await createAppointment(appointmentData);
                console.log(newAppointment);


                if (!!newAppointment) {
                    form.reset();
                    router.push(`/patient/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`);
                }
            } else {
                const appointmentData = {
                    userId,
                    appointmentId: appointment?.$id!,
                    appointment: {
                        primaryPhysician: values.primaryPhysician,
                        reason: values.appointmentReason,
                        schedule: new Date(values.schedule),
                        status: status as Status,
                        note: values.note,
                        cancellationReason: values.cancellationReason
                    },
                    type: type
                }

                const updatedAppointment = await updateAppointment(appointmentData);

                if (!!updatedAppointment) {
                    setOpen && setOpen(false)
                    form.reset();
                }
            }

        } catch (error) {
            console.log(error);

        }
    }

    let buttonLabel;

    switch (type) {
        case "create":
            buttonLabel = "Create Appointment";
            break;
        case "cancel":
            buttonLabel = "Cancel Appointment";
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment";
            break;
        default:
            break;
    }

    return (
        <div className={`${type === "create" ? "flex justify-center" : "flex flex-col items-center"}`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 ${type === "create" ? "w-[95%] md:w-[93%] lg:w-[90%]" : "w-[70%]"}`}>
                    {type !== "cancel" && (
                        <>
                            <FormField
                                control={form.control}
                                name="primaryPhysician"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Doctor</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400">
                                                    <SelectValue placeholder="Select a doctor" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        doctors.map(doctor => (
                                                            <SelectItem key={doctor.value} value={doctor.label}>{doctor.label}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="schedule"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expected Appointment Date</FormLabel>
                                        <FormControl>
                                        <div className="flex items-center  border rounded-md">
                                            <Image src={calendarPic} alt="Calendar" className="h-8 w-8" />
                                            <DatePicker dateFormat="MM/dd/yyyy - h:mm aa" showTimeSelect placeholderText="Click to select a appointment date" selected={field.value} onChange={(date) => field.onChange(date!)} className={`h-10 px-1 ${type === "create" ? "w-[220px] md:w-[550px] lg:w-[420px] xl:w-[550px]" : "w-[180px] md:w-[250px]"} border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400`} />
                                        </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="md:flex items-center gap-x-4">

                                <div className="w-full md:w-1/2">
                                    <FormField
                                        control={form.control}
                                        name="appointmentReason"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reason for Appointment</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter reason for appointment" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="w-full md:w-1/2 pt-6 md:pt-0">
                                    <FormField
                                        control={form.control}
                                        name="note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Notes</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter Notes" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {type === "cancel" && (
                        <>
                            <FormField
                                control={form.control}
                                name="cancellationReason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reason for Appointment Cancellation</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter reason for appointment cancellation" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}


                    <Button type="submit" disabled={isSubmitting} className={`${type === "cancel" ? "bg-red-500" : "bg-cyan-500"} w-full`}>{isSubmitting ? "Loading..." : buttonLabel}</Button>
                </form>
            </Form>
        </div>
    )
}

export default AppointmentForm;