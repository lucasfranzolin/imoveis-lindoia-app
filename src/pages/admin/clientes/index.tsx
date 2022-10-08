import { AdminCustomers } from '../../../components/admin/AdminCustomers';
import { MainLayout } from '../../../layouts/MainLayout';

const AdminClientesPage = () => {
    return (
        <MainLayout isProtected allowedRoles={['admin']}>
            <AdminCustomers />
        </MainLayout>
    );
};

export default AdminClientesPage;
