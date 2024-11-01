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
import { CreateUser, registerPatient } from "@/actions/patient"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { UploadDropzone } from "@/lib/utils/uploadthing";
import Image from "next/image";
import calendarPic from "../../../public/calendar-icon.jpg";

const gender = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }, { label: "Other", value: "other" }];
const doctors = [{ label: "Dr. John Doe", value: "dr.johndoe" }, { label: "Dr. Jane Smith", value: "dr.janesmith" }];
const identificationTypes = [{ label: "Passport", value: "passport" }, { label: "Driver's License", value: "driverslicense" }, { label: "National ID", value: "nationalid" }, { label: "Birth Certificate", value: "birthcertificate" }, { label: "Other", value: "other" }];



const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters.", }).max(50, { message: "Name must be lower than 50 characters" }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).max(15, { message: "Phone number must be lower than 15 digits." }),
    gender: z.enum(["male", "female", "other"], { required_error: "You need to select gender.", }),
    address: z.string().min(5, { message: "Address must be at least 5 characters." }).max(100, { message: "Address must be lower than 100 characters" }),
    occupation: z.string().min(5, { message: "Occupation must be at least 5 characters." }).max(50, { message: "Occupation must be lower than 100 characters" }),
    emergencyContactName: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be lower than 50 characters" }),
    emergencyContactNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).max(15, { message: "Phone number must be lower than 15 digits." }),
    primaryPhysician: z.string({required_error: "You need to select primary physician." }),
    insuranceProvider: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be lower than 50 characters" }),
    insurancePolicyNumber: z.string().min(5, { message: "Policy number must be at least 5 characters." }).max(50, { message: "Policy number must be lower than 50 characters" }),
    allergies: z.string().optional(),
    currentMedication: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.enum(["passport", "driverslicense", "nationalid", "birthcertificate", "other"]).optional(),
    identificationNumber: z.string().optional(),
    treatmentConsent: z.boolean().default(false).refine((value) => value === true, {message: "You must consent to treatment in order to proceed",}),
    disclosureConsent: z.boolean().default(false).refine((value) => value === true, {message: "You must consent to disclosure in order to proceed",}),
    privacyConsent: z.boolean().default(false).refine((value) => value === true, {message: "You must consent to privacy in order to proceed",}),
});



const RegistrationForm = ({userId} : {userId: string}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            gender: undefined,
            address: "",
            occupation: "",
            emergencyContactName: "",
            emergencyContactNumber: "",
            primaryPhysician: undefined,
            insuranceProvider: "",
            insurancePolicyNumber: "",
            allergies: "",
            currentMedication: "",
            familyMedicalHistory: "",
            pastMedicalHistory: "",
            identificationType: undefined,
            identificationNumber: "",
            treatmentConsent: false,
            disclosureConsent: false,
            privacyConsent: false,
        },
    })

    const { isSubmitting } = form.formState;
    const router = useRouter();
    const [startDate, setStartDate] = useState(new Date());
    const [imageUrl, setImageUrl] = useState<string>("");
    

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const newPatient = {
                ...values, 
                birthDate: startDate,
                identificationDocument: imageUrl,
                userId: userId
            }

            const patient = await registerPatient(newPatient);
            
            
            if(!!patient) router.push(`/patient/${userId}/new-appointment`)

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[95%] md:w-[93%] lg:w-[90%]">
                    <p className='font-semibold'>Personal Information</p>
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

                    <div className="md:flex items-center gap-x-4">

                        <div className="w-full md:w-1/2">
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

                        <div className="pt-6 md:pt-0 w-full md:w-1/2">
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

                    <div className="md:flex items-center gap-x-4">
                        <div className="w-full md:w-1/2">
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                            <div className="flex items-center  border rounded-md">
                                            <Image src={calendarPic} alt="Calendar" className="h-8 w-8" />
                                            <DatePicker dateFormat="MM/dd/yyyy" placeholderText="Click to select a birth date" selected={startDate} onChange={(date) => setStartDate(date!)} className=" h-10 rounded px-1 w-[300px] md:w-[250px] lg:w-[180px] xl:w-[250px] focus:outline-none focus:outline-cyan-400 focus:border-cyan-400  focus:ring-cyan-400" />
                                        
                                            </div>
                                    </FormItem>
                        </div>
                        <div className="w-full pt-6 md:pt-0 md:w-1/2">
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
                                                            <RadioGroupItem value={genderOption.value} id={genderOption.value} />
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

                    <div className="md:flex items-center gap-x-4">

                        <div className="w-full md:w-1/2">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="14 street,New York" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full pt-6 md:pt-0 md:w-1/2">
                            <FormField
                                control={form.control}
                                name="occupation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Occupation</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Software Engineer" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="md:flex items-center gap-x-4">

                        <div className="w-full md:w-1/2">
                            <FormField
                                control={form.control}
                                name="emergencyContactName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Emergency Contact Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Guardian's name" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full pt-6 md:pt-0 md:w-1/2">
                            <FormField
                                control={form.control}
                                name="emergencyContactNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Emergency Contact Number</FormLabel>
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

                    <p className='font-semibold pt-6'>Medical Information</p>

                    <FormField
                        control={form.control}
                        name="primaryPhysician"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Primary Physician</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400">
                                            <SelectValue placeholder="Select a physician" />
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


                    <div className="md:flex items-center gap-x-4">

                        <div className="w-full md:w-1/2">
                            <FormField
                                control={form.control}
                                name="insuranceProvider"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Insurance Provider</FormLabel>
                                        <FormControl>
                                            <Input placeholder="BlueCross BlueShield" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full pt-6 md:pt-0 md:w-1/2">
                            <FormField
                                control={form.control}
                                name="insurancePolicyNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Insurance Policy Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ABCD12345678" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="md:flex items-center gap-x-4">

                        <div className="w-full md:w-1/2">
                            <FormField
                                control={form.control}
                                name="allergies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Allergies(if any)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Peanuts, Penicillin etc" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full pt-6 md:pt-0 md:w-1/2">
                            <FormField
                                control={form.control}
                                name="currentMedication"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Medication(if any)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Napa 500mg, Fexo 500 etc" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="md:flex items-center gap-x-4">

                        <div className="w-full md:w-1/2">
                            <FormField
                                control={form.control}
                                name="familyMedicalHistory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Family medical history</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Diabetes, Allergy etc" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full pt-6 md:pt-0 md:w-1/2">
                            <FormField
                                control={form.control}
                                name="pastMedicalHistory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Past Medical History</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Diabetes, Allergy etc" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <p className='font-semibold pt-6'>Identification & Verification</p>

                    <FormField
                        control={form.control}
                        name="identificationType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Identification Type</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400">
                                            <SelectValue placeholder="Select an identification type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                identificationTypes.map(i => (
                                                    <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>
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
                        name="identificationNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Identification Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="12345678" {...field} className="border-gray-300 focus:outline-none focus:outline-cyan-400 focus:border-cyan-400 focus:ring-cyan-400" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <FormLabel>Scanned copy of identification document</FormLabel>
                        <main>
                            <div>
                                {
                                    !!imageUrl ?
                                        <div className="relative">
                                            <Image src={imageUrl} alt="" width={600} height={300} />
                                            <p onClick={() => setImageUrl("")} className="cursor-pointer bg-white font-semibold px-2 text-lg rounded-full absolute right-2 top-2">x</p>
                                        </div>
                                        :
                                        <UploadDropzone
                                            className="ut-label:text-teal-600 border-cyan-500 ut-allowed-content:hidden ut-button:bg-cyan-500 ut-upload-icon:text-cyan-500 cursor-pointer"
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res: any) => {
                                                setImageUrl(res[0].url);
                                            }}
                                            onUploadError={(error: Error) => {
                                                // Do something with the error.
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        />
                                }
                            </div>
                        </main>
                    </div>

                    <p className='font-semibold pt-6'>Privacy & Consent</p>

                    <FormField
                        control={form.control}
                        name="treatmentConsent"
                        render={({ field }) => (
                            <FormItem >
                                <div className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>I consent to treatment</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="disclosureConsent"
                        render={({ field }) => (
                            <FormItem >
                                <div className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>I consent to disclosure of information</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="privacyConsent"
                        render={({ field }) => (
                            <FormItem >
                                <div className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>I consent to privacy policy</FormLabel>
                                </div>
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

export default RegistrationForm