import {SignUp} from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='flex h-screen w-full bg-slate-950 items-center justify-center'>
        <SignUp/>
    </main>
  )
}

export default SignUpPage
