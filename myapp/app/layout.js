import Provider from '@/SessionProvider'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Donut Shop',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
   <Provider>
          <Navbar />
          <section className='h-100 max-w-screen-xl	m-auto p-4 rounded-xl	 shadow rounded-xl '>
          {children}

          </section>
   </Provider>
      </body>
    </html>
  )
}
