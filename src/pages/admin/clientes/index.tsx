import { Customers } from '../../../components/Admin';
import { MainLayout } from '../../../layouts/MainLayout';

const AdminClientesPage = () => {
    return (
        <MainLayout isProtected allowedRoles={['admin']}>
            <Customers />
        </MainLayout>
    );
};

export default AdminClientesPage;
