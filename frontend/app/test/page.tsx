import React from 'react'
const URL = "http://localhost:3002"
const PATH = "api/vehicles"
const slug = "COROLLA"
export default function Page() {
    console.log("RES")
    const res = fetch(`${URL}/${PATH}/${slug.toUpperCase()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    }).then(res => console.log(res.body))

    console.log(res)
    return (
        <div>Page</div>
    )
}
