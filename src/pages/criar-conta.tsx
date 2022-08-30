import { CreateAccount } from '../components/CreateAccount';
import { AuthLayout } from '../layouts/AuthLayout';

export const CreateAccountPage = () => {
    return (
        <AuthLayout>
            <CreateAccount />
        </AuthLayout>
    );
};

export default CreateAccountPage;
