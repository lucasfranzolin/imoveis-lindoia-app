import { Properties } from '../../../components/Admin';
import { MainLayout } from '../../../layouts/MainLayout';

const AdminImoveisPage = () => {
    return (
        <MainLayout isProtected allowedRoles={['admin']}>
            <Properties />
        </MainLayout>
    );
};

export default AdminImoveisPage;
