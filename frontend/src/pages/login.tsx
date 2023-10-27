import { signIn } from 'next-auth/react';

import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import '../styles/globals.css';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

const Login = () => {
    const { ...form } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(value: z.infer<typeof loginSchema>) {
        try {
          const res = await signIn("credentials", { redirect : false, email : value.email, password : value.password });
          console.log(res)
        } catch(err) {
            console.log(err);
        }
    }

    const isSubmitign = form.formState.isSubmitting;

    return (
        <div className="h-screen w-full grid place-content-center">
            <div className="border-2 border-primary rounded-md p-8">
                <div className="header-logo flex items-center justify-center border-r border-lines w-[400px] py-8 ">
                    <Image
                        src="/images/logo-dark.png"
                        alt="logo"
                        width="150"
                        height="100"
                        className="hidden dark:block"
                    />

                    <Image src="/images/logo.png" alt="logo" width="150" height="100" className="dark:hidden" />
                </div>

                <div className="form__container">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email :</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@gmail.com" type="email" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password :</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isSubmitign} className="w-full rounded-full" type="submit">
                                Login
                            </Button>
                        </form>
                    </Form>
                    <button
                        onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })}
                        className="w-full  justify-center bg-gray-100 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                    >
                        <Image src="/google.png" width={20} height={20} alt="google's logo" />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
