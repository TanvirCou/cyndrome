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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-number-input'
import { useRouter } from "next/navigation"
import { CreateUser } from "@/actions/patient"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters.", }).max(50, { message: "Name must be lower than 50 characters" }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).max(15, { message: "Phone number must be lower than 15 digits." }),
    birthday: z.string(),
    gender: z.string(),
});


const gender = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }, { label: "Other", value: "other" }];


const RegistrationForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            birthday: "",
            gender: ""
        },
    })

    const { isSubmitting } = form.formState;
    const router = useRouter();
    const [startDate, setStartDate] = useState(new Date());

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[90%]">
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

                    <div className="flex items-center gap-x-4">

                        <div className="w-1/2">
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
                        </div>

                        <div className="w-1/2">
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
                                                className="border border-gray-300 py-1 rounded px-1 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400  focus:ring-cyan-400"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-x-4">
                        <div className="w-1/2">
                            <FormField
                                control={form.control}
                                name="birthday"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <br />
                                        <FormControl>
                                            <DatePicker dateFormat="MM/dd/yyyy" placeholderText="Click to select a birth date" selected={startDate} onChange={(date) => setStartDate(date!)} className="border h-10 rounded px-1 w-[300px] focus:outline-none focus:outline-cyan-400 focus:border-cyan-400  focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-1/2">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-3">
                                            {
                                                gender.map((genderOption, index) => (
                                                    <div className="flex items-center space-x-1" key={index}>
                                                        <RadioGroupItem  value={genderOption.value} id={genderOption.value} />
                                                        <Label htmlFor={genderOption.label}>{genderOption.label}</Label>
                                                    </div>
        
                                                
                                                ))
                                            }
                                            </RadioGroup>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="bg-cyan-500 w-full">{isSubmitting ? "Loading..." : "Get Started"}</Button>
                </form>
            </Form>
        </div>
    )
}

export default RegistrationForm