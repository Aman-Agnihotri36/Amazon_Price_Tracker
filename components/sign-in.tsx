"use client"

import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'

import { signInWithGoogle } from "@/lib/action";


function SignIn() {

    return (
        <div className='w-full h-screen flex items-center justify-center'>

            <Card className='min-w-xs text-center'>
                <div>
                    <h1 className='text-2xl font-bold m-0'>Welcome back</h1>
                    <p>please login to continue</p>
                </div>
                <div>

                    <form action={signInWithGoogle}>
                        <Button className='cursor-pointer' type="submit">Sign in with Google</Button>
                    </form>

                </div>
            </Card>
        </div>
    )
}

export default SignIn


