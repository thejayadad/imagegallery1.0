'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'


const CreateDonut = () => {
    const CLOUD_NAME = 'socialsite'
    const UPLOAD_PRESET = 'donut_shop'

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState("Hot")
    const [photo, setPhoto] = useState('')

    const { data: session, status } = useSession()
    const router = useRouter()


    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p>
            Access Denied
        </p>
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!photo || !title || !category){
            toast.error("All fields are required")
            return
        }

        try {
          const imageUrl = await uploadImage()
          
          const res = await fetch(`http://localhost:3000/api/donut`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}` 
            },
            method: 'POST',
            body: JSON.stringify({title,category,imageUrl,authorId: session?.user?._id, creator: session?.user?._id})
          })

          if(!res.ok){
            throw new Error("Error occured")
          }

          const donut = await res.json()

          router.push('/')
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
        <h2>Create Donut</h2>
        <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Hot">Hot</option>
                        <option value="Sprinkle">Sprinkle</option>
                        <option value="Custom">Custom</option>
                        <option value="Filled">Filled</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                    <label htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                  <button>Create</button>
                </form>

        <ToastContainer />
    </section>
  )
}

export default CreateDonut