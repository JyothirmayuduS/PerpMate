'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/../utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect('/auth?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      }
    }
  })

  if (error) {
    redirect('/auth?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}

export async function loginWithGoogle() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: process.env.NEXT_PUBLIC_SITE_URL 
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        : 'http://localhost:3000/auth/callback',
    },
  })

  if (error) {
    redirect('/auth?error=' + encodeURIComponent(error.message))
  }

  if (data.url) {
    redirect(data.url)
  }
}
