import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="bg-[#1F1F1F] flex w-2/5 flex-col p-8 rounded-lg text-[#EBFFF2] text-base">

                <div>
                    <p className="py-4 text-3xl font-fustat-bold">Confirm your password</p>
                    <p>This is a secure area of the application. Please confirm your password before continuing.</p>
                </div>

                <form onSubmit={submit}>
                    <div className="mt-4">
                        <p className="text-xl">Password</p>
                        <div className="mt-2 text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md items-center justify-end flex focus-within:outline-none focus-within:ring-0 focus-within:border-[#EBFFF2] pr-2">
                            <input
                                id="password"
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full bg-transparent outline-none border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none focus-visible:outline-none"
                            />
                        </div>

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Confirm
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
