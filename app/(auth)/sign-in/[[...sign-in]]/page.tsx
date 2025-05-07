import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='flex h-screen w-full bg-slate-950 items-center justify-center'>
        <SignIn/>
    </main>
  )
}

export default SignInPage
