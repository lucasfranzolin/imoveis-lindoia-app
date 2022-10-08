import { AdminHome } from '../../components/admin/AdminHome';
import { MainLayout } from '../../layouts/MainLayout';

const AdminPage = () => {
    return (
        <MainLayout isProtected allowedRoles={['admin']}>
            <AdminHome />
        </MainLayout>
    );
};

export default AdminPage;
