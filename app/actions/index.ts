'use server'
type LoginData = {
    access_token: string | null

}

export async function loginAction(_: LoginData, formData: FormData): Promise<LoginData>  {
    const username = formData.get('username')
    const password = formData.get('password')
    if (!username || !password) {
        throw new Error('Email and password are required')
    }
    if(typeof username !== 'string' || typeof password !== 'string') {
        throw new Error('Email and password must be strings')
    }
    const payload = new URLSearchParams()
    payload.set('username', username)
    payload.set('password', password)


    try {
    const response = await fetch('http://127.0.0.1:8000/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload

    })
    if(!response.ok) {
        // handle error
        throw new Error()
    }
    return await response.json()


    } catch(e) {
        console.log(e)
    }
    return {access_token: null}
}