import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useRequest } from "@/request/use-request";
import { useForm } from "react-hook-form";
import { useClientAuth } from "@/hooks/use-client-auth";


type SignupFormValues = {
	email: string
	password: string
}


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>();
	const [{loading}, trigger] = useRequest({
		url: '/v1/auth/login',
		method: 'POST',
	},{manual: true})
  
	const handleClientAuth = useClientAuth()
	const onSubmit = async (values: SignupFormValues) => {
		try {
			const resp = await trigger({ data: {
				email: values.email,
				password: values.password
			} });
			if(resp?.data?.token) {
				console.log(resp?.data?.token, 'token??')
				handleClientAuth(resp.data.token);
			}
		}
		catch(e) {
			console.log(e)
		}
	}
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
			<Logo />
            <span className="text-2xl font-bold text-foreground">PayPals</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mt-6">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <Card className="p-8 shadow-card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
					id="email"
					type="email"
					placeholder="you@example.com"
					{...register('email',{required: 'This field is required'})}
					className="w-full"
				/>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {/* <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot?
                </button> */}
              </div>
              <Input
					id="password"
					type="password"
					placeholder="••••••••"
					{...register('password',{required: 'This field is required'})}
					className="w-full"
				/>
            </div>

            <Button type="submit" className="w-full bg-gradient-hero">
             {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </div> */}
        </Card>

        {/* Sign Up Link */}
        <p className="text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
