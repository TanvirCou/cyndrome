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
import { Input } from "@/components/ui/input"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useRouter } from "next/navigation"
import { CreateUser } from "@/actions/patient"

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters.", }).max(50, { message: "Name must be lower than 50 characters" }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).max(15, { message: "Phone number must be lower than 15 digits." }),
})


const PatientForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
        },
    })

    const { isSubmitting } = form.formState;
    const router = useRouter();

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const user = await CreateUser(values);
            console.log(user);

            if (!!user) {
                router.push(`patient/${user.$id}/registration`);
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[80%]">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400  focus:ring-cyan-400" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john123@gmail.com" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        {...field}
                                        defaultCountry="BD"
                                        international
                                        withCountryCallingCode
                                        placeholder="Enter phone number"
                                        className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400  focus:ring-cyan-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting} className="bg-cyan-500 w-full">{isSubmitting ? "Loading..." : "Get Started"}</Button>
                </form>
            </Form>
        </div>
    )
}

export default PatientForm