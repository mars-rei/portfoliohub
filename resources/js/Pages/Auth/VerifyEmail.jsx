import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="bg-[#1F1F1F] flex w-2/5 flex-col p-8 rounded-lg text-[#EBFFF2] text-base">
                <div>
                    <p className="py-4 text-3xl font-fustat-bold">Thanks for signing up to PortfolioHub!</p>
                    <p>Before getting started, could you verify your email address by clicking on the link we just emailed to you?</p>
                    <p className="mt-2">If you didn't receive the email, we will gladly send you another.</p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="text-green-600">
                        A new verification link has been sent to the email address
                        you provided during registration.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mt-12 flex justify-between">
                        <PrimaryButton disabled={processing}>
                            Resend Verification Email
                        </PrimaryButton>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-[#B5446E] text-base font-fustat-semibold mr-4"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
