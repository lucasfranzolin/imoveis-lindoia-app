import { SignIn } from '../components/SignIn';
import { AuthLayout } from '../layouts/AuthLayout';

export const SignInPage = () => {
    return (
        <AuthLayout>
            <SignIn />
        </AuthLayout>
    );
};

export default SignInPage;
