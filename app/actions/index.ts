'use server'
import { cookies } from 'next/headers'
import { redirect, unauthorized } from 'next/navigation'

export async function loginAction(
  _: { message: string; status: number } | null,
  formData: FormData
): Promise<{ status: number; message: string }> {
  const username = formData.get('username')
  const password = formData.get('password')
  if (!username || !password) {
    return { status: 400, message: 'Email and password are required' }
  }
  if (typeof username !== 'string' || typeof password !== 'string') {
    return { status: 400, message: 'Email and password must be strings' }
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
      return {
        status: 401,
        message: 'Email or password is not valid',
      }
    }
    const data: { access_token: string } = await response.json()
    if (data.access_token) {
      const cookieStore = await cookies()
      cookieStore.set('access_token', data.access_token)
    } else {
      throw new Error(
        'Unexpected condition: No access token in server response'
      )
    }
    return { status: 200, message: 'Success' }
  } catch (e) {
    return { status: 500, message: 'Server Error' }
  }
}

export async function logout(): Promise<void> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')
    if (token) {
      cookieStore.delete('access_token')
    }
  } catch {
    throw new Error("Unexpected condition: Couldn't get cookies.")
  }
  return redirect('/login')
}
