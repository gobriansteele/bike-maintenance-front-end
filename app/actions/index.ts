'use server'
export async function loginAction(formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')
    if (!username || !password) {
        throw new Error('Email and password are required')
    }
    if(typeof username !== 'string' || typeof password !== 'string') {
        throw new Error('Email and password must be strings')
    }
    const foo = new URLSearchParams()
    foo.set('username', username)
    foo.set('password', password)


    try {
    const response = await fetch('http://127.0.0.1:8000/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: foo

    })
    if(!response.ok) {
        // handle error
    }
    const data = await response.json()
        console.log(data)

    } catch(e) {
        console.log(e)
    }
}