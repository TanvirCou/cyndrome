"use client"
import React, { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { usePathname, useRouter } from 'next/navigation';
import { decryptKey, encryptKey } from '@/lib/utils';


const Passkey = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const path = usePathname();

    console.log(path);
    

    const closeModal = () => {
        setIsOpen(false);
        router.push("/")
    };

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        try {
            if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                const encrypedKey = encryptKey(passkey);

                localStorage.setItem("accessKey", encrypedKey);
                router.push("/admin");
                setIsOpen(false);
            }
        } catch (error) {
            setError("Invalid passkey. Please try again.");
        }
    }

    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem("accessKey") : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);

       
            if(accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
                router.push("/admin");
                setIsOpen(false);
            } else {
                setIsOpen(true)
            }
     
    }, [encryptedKey])


    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className='w-[80%] md:w-[40%] lg:w-[28%]'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex justify-between items-center'>
                        <p className='font-semibold text-md'>Admin access verification</p>
                        <p className='font-bold cursor-pointer text-sm' onClick={closeModal}>X</p>
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-xs'>
                        To access the admin panel, please enter the passkey.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className='w-full'>
                            <InputOTPSlot className='w-[17%] h-10' index={0} />
                            <InputOTPSlot className='w-[17%] h-10' index={1} />
                            <InputOTPSlot className='w-[17%] h-10' index={2} />
                            <InputOTPSlot className='w-[17%] h-10' index={3} />
                            <InputOTPSlot className='w-[17%] h-10' index={4} />
                            <InputOTPSlot className='w-[17%] h-10' index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <div className='text-center'>
                    {!!error && <p className='text-xs text-red-500 font-medium'>{error}</p>}
                </div>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={validatePasskey} className='w-full bg-cyan-500'>Enter Admin Passkey</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default Passkey;
