"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStore } from "@/store/useStore";
import { BookOpen, AlertCircle } from "lucide-react";

const authSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function AuthPage() {
  const router = useRouter();
  const loginUser = useStore((state) => state.login);
  const user = useStore((state) => state.user);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setErrorMsg("");
      loginUser(data.email, data.name);
      
      // Check if user is already onboarded
      const currentUser = useStore.getState().user;
      if (currentUser && currentUser.onboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An authentication error occurred.");
    }
  };

  const handleSocialAuth = (provider: string) => {
    loginUser(`mock.${provider.toLowerCase()}@college.edu`, `${provider} User`);
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen text-on-surface font-sans flex flex-col md:flex-row bg-background">
      {/* Left Pane: Topographic Visual Background */}
      <div className="hidden md:flex flex-1 relative overflow-hidden bg-primary items-center justify-center p-12">
        <div 
          className="absolute inset-0 z-0 opacity-80" 
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdkQpdiHW6dpOYGalPE_OH9s5k-KWhdRNa9iu70M5a9zjKKevGix9JNsPiXMcryetNAu2VtfyKbcYDJsnzFnvkOPPrBMs3B3UhIi2blfzhXZrGsnJxEkJmB7JB7sVOZQ2l0dB5vXNnkJFjYqvwPhfNMnunhZUTe7uI3WfwFQNePDRQLTtV-R3YhIlloHJQGuxf-mX3mYL5qmM5SCJ5W9klJywZrcGlLpK2W7roIC8anq0dgb0CY7-t')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="z-10 relative text-on-primary max-w-lg">
          <h1 className="font-display font-extrabold text-5xl mb-6 leading-tight">
            Master the Path.
          </h1>
          <p className="font-sans text-base text-on-primary/80 leading-relaxed">
            Elevate your preparation with a platform designed for precision, focus, and ultimate success. Join the elite.
          </p>
        </div>
      </div>

      {/* Right Pane: Authentication Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 bg-surface-container-lowest">
        <div className="w-full max-w-md mx-auto">
          {/* Brand Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="text-primary w-8 h-8" />
              <span className="font-display text-2xl font-bold tracking-tight">PrepMate</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary mb-3">
              Your journey to FAANG starts here.
            </h2>
            <p className="font-sans text-sm text-on-surface-variant">
              {isSignUp ? "Create an account to begin." : "Sign in to continue your preparation."}
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-error-container/30 border border-error/20 text-error rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold">{errorMsg}</p>
            </div>
          )}

          {/* Social Authentications */}
          <div className="flex flex-col gap-4 mb-8">
            <button 
              onClick={() => handleSocialAuth("Google")}
              className="w-full flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant py-3 rounded-lg hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-200 active:scale-95 font-sans text-sm font-semibold cursor-pointer"
            >
              <img 
                alt="Google" 
                className="w-5 h-5" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK6NjNEivLFJGht9QRDohjLoVhi5Tvyz-RHQWnvmWaBsBTKREodDcGE2d3TgDfE0_-ha6QtmuCktJmaFiPP-2aKjPB_S-qRMDCPvhhlbwKGIhUypDYFqYYcuYJNlgvuSsHLfwvfcGKxyO5K6H7x1CxVBeLtWdWEBbk_gyWbPRTqozulFVUI3kdtW-zsLsweXMp4OLVTx2MMBgVJoQQa8sdgBo_TOuBJwP6NOISXI60yp9I_RjY7pjQ"
              />
              Continue with Google
            </button>
            <button 
              onClick={() => handleSocialAuth("LinkedIn")}
              className="w-full flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant py-3 rounded-lg hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-200 active:scale-95 font-sans text-sm font-semibold cursor-pointer"
            >
              <img 
                alt="LinkedIn" 
                className="w-5 h-5" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYhAPluHDGF-_nWLAPjkVpmpEi2IAG1-BujvVFQLwU0NEwk9kTCm25wsOQEMAAYvlUjJZ2Y5G_joAqpaFin5I0Blsl3kr8ZIZrBaZGgTCByYZUe2ooT9G8RUzQgcvLbVXOxxk31v-k0dE9e_AMQxaLoUl9SlUtWcmNBcSRzSYMAantXmPP7PAguEY1MmcmO-yWnW8dEveAztZuZJdKr9bCBlQqA83C9T8tIdl3gNyYmQHDocy3vO0e"
              />
              Continue with LinkedIn
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-outline-variant"></div>
            <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Or</span>
            <div className="flex-1 h-px bg-outline-variant"></div>
          </div>

          {/* Email / Password Auth Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2" htmlFor="name">
                  Full Name
                </label>
                <input 
                  id="name"
                  type="text" 
                  placeholder="Rahul Kumar" 
                  className={`w-full bg-background border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-sans text-sm ${
                    errors.name ? "border-error" : "border-outline-variant"
                  }`}
                  {...register("name", { required: isSignUp })}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-error font-medium">{errors.name.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2" htmlFor="email">
                Email Address
              </label>
              <input 
                id="email"
                type="email" 
                placeholder="name@example.edu" 
                className={`w-full bg-background border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-sans text-sm ${
                  errors.email ? "border-error" : "border-outline-variant"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-error font-medium">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider" htmlFor="password">
                  Password
                </label>
                {!isSignUp && (
                  <button type="button" className="font-sans text-[10px] text-primary hover:underline font-semibold uppercase tracking-wider">
                    Forgot password?
                  </button>
                )}
              </div>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                className={`w-full bg-background border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-sans text-sm ${
                  errors.password ? "border-error" : "border-outline-variant"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-error font-medium">{errors.password.message}</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-on-primary py-4 rounded-lg font-sans text-sm font-bold hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-200 active:scale-98 mt-6 cursor-pointer flex items-center justify-center"
            >
              {isSubmitting ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Toggle form state */}
          <div className="mt-10 text-center">
            <p className="font-sans text-xs text-on-surface-variant flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-secondary text-lg" data-icon="workspace_premium" data-weight="fill">workspace_premium</span>
              Joined by 50,000+ students from top IITs &amp; NITs.
            </p>
            <p className="font-sans text-sm text-on-surface-variant mt-4">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button 
                    onClick={() => { setIsSignUp(false); reset(); }}
                    className="text-primary font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button 
                    onClick={() => { setIsSignUp(true); reset(); }}
                    className="text-primary font-bold hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
