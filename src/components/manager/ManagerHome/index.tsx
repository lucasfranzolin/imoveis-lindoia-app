import { withAuth } from '../../../hocs/withAuth';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { userSel } from '../../../store/slices/user';

export const ManagerHome = withAuth((props: any) => {
    const user = useAppSelector(userSel);

    return (
        <div>
            <pre>{JSON.stringify({ user }, null, 4)}</pre>
            <br />
            <pre>{JSON.stringify({ props }, null, 4)}</pre>
        </div>
    );
});
