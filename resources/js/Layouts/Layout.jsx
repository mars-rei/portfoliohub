import { usePage } from '@inertiajs/react';
import GuestLayout from './GuestLayout';
import AuthenticatedLayout from './AuthenticatedLayout';

export default function Layout({children}) {
    const { auth } = usePage().props;
    
    if (auth?.user) {
        return (
            <AuthenticatedLayout auth={auth}>
                {children}
            </AuthenticatedLayout>
        );
    }
    
    return (
        <GuestLayout>
            {children}
        </GuestLayout>
    );
}