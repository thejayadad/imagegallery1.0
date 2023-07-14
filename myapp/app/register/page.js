'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineFileImage } from 'react-icons/ai'


const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [photo, setPhoto] = useState('')
    const CLOUD_NAME = 'socialsite'
    const UPLOAD_PRESET = 'donut_shop'


    const handleSubmit = async(e) => {
        e.preventDefault()
    
        if(username === '' || email === '' || password === '' || photo === ''){
            toast.error("Fill all fields")
            return
        }
    
        if(password.length < 6){
            toast.error("Password must be at least 6 characters")
            return
        }
    
        try {
            const imageUrl = await uploadImage()
            const res = await fetch('http://localhost:3000/api/register', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({username, email, password,imageUrl})
            })
    
            console.log(await res.json())
            if(res.ok){
                toast.success("Successfully registered the user")
                setTimeout(() => {
                    signIn()
                }, 1500)
                return
            } else {
                toast.error("Error occured while registering")
                return
            }
        } catch (error) {
            console.log(error)
        }
      }



      const uploadImage = async () => {
        if (!photo) return

        const formData = new FormData()

        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
          })

          const data = await res.json()

          const imageUrl = data['secure_url']

          return imageUrl
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <section>
      <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username...' onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                    <button>Register</button>
                    <button onClick={() => signIn()}>
                        Don&apos;t have an account? <br /> Register now.
                    </button>
                </form>
    <ToastContainer />
    </section>
  )
}

export default Register