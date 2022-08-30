import { Home } from '../../components/Admin';
import { MainLayout } from '../../layouts/MainLayout';

const AdminPage = () => {
    return (
        <MainLayout isProtected allowedRoles={['realtor']}>
            <Home />
        </MainLayout>
    );
};

export default AdminPage;
