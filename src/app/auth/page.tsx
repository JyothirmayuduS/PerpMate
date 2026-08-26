import { login, signup, loginWithGoogle } from './actions'
import { ArrowRight, Sparkles, Mail, Lock, User } from 'lucide-react'
import Link from 'next/link'

export default function AuthPage({
  searchParams,
}: {
  searchParams: { error?: string, mode?: string }
}) {
  const isSignUp = searchParams.mode === 'signup'

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#009668]/20 blur-[120px] pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-display font-black text-xl tracking-tight text-on-surface">
          PrepMate
        </span>
      </Link>

      <div className="w-full max-w-md bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/50 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-black text-on-surface mb-2">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="font-sans text-on-surface-variant text-sm">
            {isSignUp ? "Start your placement journey today." : "Log in to continue your progress."}
          </p>
        </div>

        {searchParams.error && (
          <div className="mb-6 p-4 bg-error-container/30 border border-error/50 rounded-xl">
            <p className="text-error text-sm font-bold text-center">{searchParams.error}</p>
          </div>
        )}

        <form className="flex flex-col gap-5">
          {isSignUp && (
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Rahul Kumar"
                  className="w-full h-12 pl-12 pr-4 bg-surface-container rounded-xl border-none outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface transition-shadow"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
              <input
                name="email"
                type="email"
                required
                placeholder="rahul@college.edu"
                className="w-full h-12 pl-12 pr-4 bg-surface-container rounded-xl border-none outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface transition-shadow"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full h-12 pl-12 pr-4 bg-surface-container rounded-xl border-none outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface transition-shadow"
              />
            </div>
          </div>

          <button
            formAction={isSignUp ? signup : login}
            className="mt-4 h-14 bg-primary text-on-primary rounded-xl font-sans text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform active:scale-95 shadow-lg shadow-primary/25"
          >
            <span>{isSignUp ? "Sign Up" : "Log In"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="relative mt-8 mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/60"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-surface-container-lowest px-4 text-on-surface-variant font-medium">Or continue with</span>
          </div>
        </div>

        <form>
          <button
            formAction={loginWithGoogle}
            className="w-full h-14 bg-surface text-on-surface border border-outline-variant rounded-xl font-sans text-sm font-bold flex items-center justify-center gap-3 hover:bg-surface-container-lowest transition-colors active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="font-sans text-sm text-on-surface-variant">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              href={isSignUp ? "/auth" : "/auth?mode=signup"}
              className="text-primary font-bold hover:underline"
            >
              {isSignUp ? "Log in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
