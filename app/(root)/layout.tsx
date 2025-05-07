import StreamVideoProvider from '@/providers/StreamClientProviders'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "YOHO",
  description: "Video conferencing app",
  icons: {
    icon: "/icon.svg",
  },
};

const RootLayout = ({children}: Readonly<{children : ReactNode}>) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout
