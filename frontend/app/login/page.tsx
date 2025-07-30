"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import npalogo from "@/public/npalogo.png"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const router = useRouter()

  const handleFakeLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // ✅ Instead of real API, just simulate success:
    router.push("/medical/dashboard")
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 animate-gradient-x">
      {/* LEFT: Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-orange-400 rounded-lg mr-3"></div>
            <h1 className="text-white text-2xl font-bold">NPA EMR</h1>
          </div>

          <h2 className="text-white text-2xl font-semibold mb-6">Sign In</h2>

          <form onSubmit={handleFakeLogin} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-white/80 text-sm">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
            </div>

            <div className="relative">
              <Label htmlFor="password" className="text-white/80 text-sm">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
                />
                <Label htmlFor="remember" className="text-white/80 text-sm">
                  Remember me
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold py-3 rounded-xl"
            >
              Log In
            </Button>
          </form>
        </div>
      </div>

      {/* RIGHT: Logo */}
      <div className="hidden lg:flex items-center justify-center relative p-8">
        <div className="relative w-full max-w-lg">
          <Image
            src={npalogo}
            alt="NPA logo"
            className="w-full h-auto rounded-2xl shadow-xl"
          />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-60 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-40 blur-xl"></div>
        </div>
      </div>
    </div>
  )
}