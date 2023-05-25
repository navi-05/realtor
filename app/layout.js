'use client'
import { ChakraProvider, Box } from '@chakra-ui/react'

import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import NProgress from 'nprogress'
import Router from 'next/router'

import './globals.css'

export default function RootLayout({ children }) {
  NProgress.configure({ showSpinner: false })

  Router.events.on('routeChangeStart', () =>  NProgress.start());
  Router.events.on('routeChangeComplete', () =>  NProgress.done());
  Router.events.on('routeChangeError', () =>  NProgress.done());

  addEventListener('navigate', (event) => {event.on('route')})

  return (
    <html lang="en">
      <head>
        <script src='nprogress.js'></script>
        <link rel='stylesheet' href='nprogress.css'/>
      </head>
      <body>
        <ChakraProvider>
          <Box maxWidth="1280px" m="auto">
            <main>
              <Navbar />
              {children}
              <Footer />
            </main>
          </Box>  
        </ChakraProvider>
      </body>
    </html>
  )
}
