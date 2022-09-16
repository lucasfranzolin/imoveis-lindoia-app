import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { Button, FormField } from '../../stories';
import { SignInParams } from '../../types/auth';
import { initialValues, validationSchema } from './form';

export const SignIn = () => {
    const router = useRouter();
    const {
        signIn: [{ success, loading }, fetchSignIn],
    } = useAuth();

    useUpdateEffect(() => {
        success && router.push('/');
    }, [success, router]);

    const handleClick = () => router.push('/criar-conta');

    const handleSubmit = (
        values: SignInParams,
        actions: FormikHelpers<SignInParams>
    ) => {
        fetchSignIn(values);
        actions.setSubmitting(false);
    };

    return (
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
                    <FormField
                        id="email"
                        label="Email"
                        error={!!formik.errors.email && !!formik.touched.email}
                        errorMsg={formik.errors.email}
                        required
                    >
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                    </FormField>
                    <FormField
                        id="password"
                        label="Senha"
                        error={
                            !!formik.errors.password &&
                            !!formik.touched.password
                        }
                        errorMsg={formik.errors.password}
                        required
                    >
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                    </FormField>
                    <Button size="lg" type="submit" loading={loading}>
                        Entrar
                    </Button>
                    <p className="mt-2 text-end">
                        Ainda não é cadastrado na plataforma?{' '}
                        <Button as="link" onClick={handleClick}>
                            Criar conta
                        </Button>
                        .
                    </p>
                </Form>
            )}
        </Formik>
    );
};
