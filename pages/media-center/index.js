import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
export default function Sheikhs() {
    const router = useRouter()
    useEffect(() => {
        router.replace('/media-center/news')
    }, [])
    return (null)
}
