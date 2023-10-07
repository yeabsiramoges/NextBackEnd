'use client';

import axios from 'axios';

import { toast } from 'react-hot-toast';
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs"
import { useRouter } from 'next/navigation';

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { sign } from 'crypto';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    // State Variables and Functions
    const session = useSession();
    const router = useRouter();
    const [ variant, setVariant ] = useState<Variant>('LOGIN');
    const [ isLoading, setIsLoading ] = useState(false);
    
    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push("/users");
        }
    }, [session?.status, router]);

    // Change between Login and Register
    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [ variant ]);

    // React Form Setup
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    // Process User Submission
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        if (variant === "REGISTER") {
            // pass in name, email, and password as data
            axios({
                method: 'post',
                url: '/api/register',
                data: data
              })
              .then(() => signIn('credentials', data))
              .catch(() => toast.error('Something went wrong!'))
              .finally(() => setIsLoading(false));
        } 
        if (variant === "LOGIN") {
            // NextAuth Sign In
            console.log(data['email'])
            if (data['email'] === "" && data['password'] === "") {
                toast.error("Invalid Login")
            } 
            else {
                signIn('credentials', {
                    ...data,
                    redirect: false
                })
                .then((callback) => {
                    console.log(callback?.ok)
                    if (callback?.error) {
                        toast.error('Invalid Credentials');
                    }

                    if (callback?.ok && !callback?.error) {
                        toast.success("Logged in!")
                        router.push("/users")
                    }
                })
                .finally(() => setIsLoading(false));
            }
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        // NextAuth Social Signin
        signIn(action, {
            redirect: false
        })
        .then((callback) => {
            console.log(callback?.ok)
            if (callback?.error) {
                toast.error('Invalid Credentials');
            }

            if (callback?.ok && !callback?.error) {
                toast.success("Logged In")
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            ">
                {/* */}
                <div
                    className="
                        bg-white
                        px-4
                        py-8
                        shadow
                        sm:rounded-lg
                        sm:px-10
                    ">
                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >  

                            {/* Using input component to handle fields */}
                            {/* Dynamic loading for login and register page */}
                            {variant === "REGISTER" && (
                                <Input 
                                    id="name" 
                                    label="Name" 
                                    register={register}
                                    errors={errors}
                                    disabled={isLoading}
                                /> 
                            )}
                            <Input 
                                id="email" 
                                label="Email"
                                type="email"
                                register={register}
                                errors={errors}
                                disabled={isLoading}
                            /> 
                            <Input 
                                id="password" 
                                label="Password" 
                                register={register}
                                errors={errors}
                                disabled={isLoading}
                            />
                            {/* Using input component to handle fields */}
                            {/* The way we declare submit allows us to not have an explicit onClick function */}
                            <div>
                                <Button
                                    disabled={isLoading}
                                    fullWidth
                                    type="submit"
                                >
                                    {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                                </Button>
                            </div>
                        </form>

                        {/* Social Auth Section */}
                        <div className="mt-6">
                                <div className="relative">
                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            flex
                                            items-center
                                        "
                                    >
                                        {/* Line Under Button */}
                                        <div className="w-full border-t border-gray-300" />
                                    </div>

                                    {/* Text inline */}
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                {/* Social Buttons: Github and Google */}
                                <div className="mt-6 flex gap-2">
                                    {/* 
                                        <AuthSocialButton 
                                            icon={BsGithub}
                                            onClick={() => socialAction('github')}
                                        />
                                    */}
                                    <AuthSocialButton 
                                        icon={BsGoogle}
                                        onClick={() => socialAction('google')}
                                    />
                                </div>

                                {/* Switch between login and register */}
                                <div className="
                                    flex
                                    gap-2
                                    justify-center
                                    text-sm
                                    mt-6
                                    px-2
                                    text-gray-500
                                ">
                                    <div>
                                        {/* Dynamic text allocation based on form state*/}
                                        {variant === "LOGIN" ? "New to Summarizer?" : "Already have an account?"}
                                    </div>

                                    {/* Button to toggle between login and register */}
                                    <div
                                        onClick={toggleVariant}
                                        className="underline cursor-pointer"
                                    >
                                        {variant === "LOGIN" ? "Create an account" : "Login" }
                                    </div>
                                </div>
                        </div>
                </div>
        </div>
    )
}

export default AuthForm;