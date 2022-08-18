import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAuth } from '../../hooks/useAuth';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useSession } from '../../hooks/useSession';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { userSel } from '../../store/slices/user';
import { SignInParams } from '../../types/auth';
import { Logo } from '../../ui/Logo';
import { Button } from '../../ui/system/Button';
import { FormErrorMessage } from '../../ui/system/FormErrorMessage';
import { FormGroup } from '../../ui/system/FormGroup';
import { FormInput } from '../../ui/system/FormInput';
import { FormLabel } from '../../ui/system/FormLabel';
import { LoadingFallback } from '../shared/LoadingFallback';
import { initialValues, validationSchema } from './form';

interface IProps {
    redirectTo?: string;
}

const SignIn = ({ redirectTo = '/' }: IProps) => {
    const router = useRouter();
    const { isAuthenticated } = useAppSelector(userSel);
    const {
        signIn: [{}, fetchSignIn],
    } = useAuth();
    const [{ loading }, getSession] = useSession();

    useEffectOnce(() => {
        isAuthenticated ? router.push(redirectTo) : getSession();
    });

    useUpdateEffect(() => {
        isAuthenticated && router.push(redirectTo);
    }, [isAuthenticated]);

    const handleClick = () => router.push('/criar-conta');

    const handleSubmit = (
        values: SignInParams,
        actions: FormikHelpers<SignInParams>
    ) => {
        fetchSignIn(values);
        actions.setSubmitting(false);
    };

    if (loading && !isAuthenticated)
        return <LoadingFallback>Verificando sessao...</LoadingFallback>;

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <Logo size="4xl" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col w-full space-y-4 mt-8 max-w-[400px]"
                    >
                        <FormGroup
                            required
                            error={
                                !!formik.errors.email && !!formik.touched.email
                            }
                        >
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormInput
                                type="email"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            <FormErrorMessage>
                                {formik.errors.email}
                            </FormErrorMessage>
                        </FormGroup>
                        <FormGroup
                            required
                            error={
                                !!formik.errors.password &&
                                !!formik.touched.password
                            }
                        >
                            <FormLabel htmlFor="password">Senha</FormLabel>
                            <FormInput
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <FormErrorMessage>
                                {formik.errors.password}
                            </FormErrorMessage>
                        </FormGroup>
                        <Button size="lg" type="submit">
                            Entrar
                        </Button>
                    </Form>
                )}
            </Formik>
            <p className="mt-2 text-end">
                Ainda não é cadastrado na plataforma?{' '}
                <Button variant="link" onClick={handleClick}>
                    Criar conta
                </Button>
                .
            </p>
        </div>
    );
};

export { SignIn };
