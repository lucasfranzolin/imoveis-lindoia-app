import { useAppSelector } from '../hooks/useAppSelector';
import { useEffectOnce } from '../hooks/useEffectOnce';
import { useSession } from '../hooks/useSession';
import { sessionSel } from '../store/slices/session';

type WrappedComponentProps = {
    [key: string]: any;
};

export const withSession = (Component: any) => {
    const WrappedComponent = (props: WrappedComponentProps) => {
        const { isFinished } = useAppSelector(sessionSel);
        const [, getSession] = useSession();

        useEffectOnce(() => {
            !isFinished && getSession();
        });

        return <Component {...props} />;
    };

    return WrappedComponent;
};
