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
import { createAppointment } from "@/actions/appointments"

const doctors = [{ label: "Dr. John Doe", value: "dr.johndoe" }, { label: "Dr. Jane Smith", value: "dr.janesmith" }];

const formSchema = z.object({
    primaryPhysician: z.string({ required_error: "You need to select primary physician." }),
    appointmentReason: z.string().min(5, { message: "Reason must be at least 5 characters." }).max(200, { message: "Reason must be lower than 200 characters" }),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
})


const AppointmentForm = ({ userId, patientId, type }: { userId: string, patientId: string, type: "create" | "cancel" | "schedule" }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            primaryPhysician: undefined,
            appointmentReason: "",
            note: "",
            cancellationReason: "",
        },
    })

    const { isSubmitting } = form.formState;
    const router = useRouter();
    const [startDate, setStartDate] = useState<Date>();

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
                    schedule: new Date(startDate!),
                    status: status as Status,
                    note: values.note
                }
                const newAppointment = await createAppointment(appointmentData);
                console.log(newAppointment);


                if (!!newAppointment) {
                    form.reset();
                    router.push(`/patient/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`);
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
        <div className="flex justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[90%]">
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
                                                            <SelectItem value={doctor.value}>{doctor.label}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>Expected Appointment Date</FormLabel>
                                <br />
                                <DatePicker dateFormat="MM/dd/yyyy - h:mm aa" showTimeSelect placeholderText="Click to select a appointment date" selected={startDate} onChange={(date) => setStartDate(date!)} className="border h-10 rounded px-1 w-[610px] focus:outline-none focus:outline-cyan-400 focus:border-cyan-400  focus:ring-cyan-400" />

                            </FormItem>

                            <div className="flex items-center gap-x-4">

                                <div className="w-1/2">
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

                                <div className="w-1/2">
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