import { LoadingFallback } from '../components/shared/LoadingFallback';
import { useAppSession } from '../hooks/useAppSession';

type WithAuthProps = {
    redirectTo: string;
};

type WrappedComponentProps = WithAuthProps & {
    [key: string]: any;
};

export const withAuth = (Component: any) => {
    const WrappedComponent = ({
        redirectTo = '/',
        ...props
    }: WrappedComponentProps) => {
        const { isLoading } = useAppSession(redirectTo);

        // if (isLoading)
        return <LoadingFallback>Verificando credenciais...</LoadingFallback>;

        return <Component {...props} />;
    };

    return WrappedComponent;
};
