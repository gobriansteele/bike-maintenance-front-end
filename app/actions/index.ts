'use server'
import { cookies } from 'next/headers'

export async function loginAction(
  _: boolean,
  formData: FormData
): Promise<boolean> {
  const username = formData.get('username')
  const password = formData.get('password')
  if (!username || !password) {
    throw new Error('Email and password are required')
  }
  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('Email and password must be strings')
  }
  const payload = new URLSearchParams()
  payload.set('username', username)
  payload.set('password', password)

  try {
    const response = await fetch('http://127.0.0.1:8000/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload,
    })
    if (!response.ok) {
      // handle error
      throw new Error()
    }
    const data: { access_token: string } = await response.json()
    if (data.access_token) {
      const cookieStore = await cookies()
      cookieStore.set('access_token', data.access_token)
      console.log(cookieStore)
    }

    return true
  } catch (e) {
    console.log(e)
  }
  return false
}
