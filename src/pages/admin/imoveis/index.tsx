import { AdminProperties } from '../../../components/admin/AdminProperties';
import { MainLayout } from '../../../layouts/MainLayout';

const AdminImoveisPage = () => {
    return (
        <MainLayout isProtected allowedRoles={['admin']}>
            <AdminProperties />
        </MainLayout>
    );
};

export default AdminImoveisPage;
