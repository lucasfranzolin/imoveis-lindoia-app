import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { Button } from '../../stories/Button';
import { FormField } from '../../stories/FormField';
import { SignUpParams } from '../../types/auth';
import { initialValues, validationSchema } from './form';

export const CreateAccount = () => {
    const router = useRouter();
    const {
        signUp: [{ success, loading }, fetchSignUp],
    } = useAuth();

    useUpdateEffect(() => {
        success && router.push('/entrar');
    }, [success, router]);

    const handleClick = () => router.push('/entrar');

    const handleSubmit = (
        values: SignUpParams,
        actions: FormikHelpers<SignUpParams>
    ) => {
        fetchSignUp(values);
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
                        id="fullName"
                        label="Nome completo"
                        error={
                            !!formik.errors.fullName &&
                            !!formik.touched.fullName
                        }
                        errorMsg={formik.errors.fullName}
                        required
                    >
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                        />
                    </FormField>
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
                        Criar conta
                    </Button>
                    <p className="mt-2 text-end">
                        Já possui uma conta?{' '}
                        <Button variant="link" onClick={handleClick}>
                            Entrar
                        </Button>
                        .
                    </p>
                </Form>
            )}
        </Formik>
    );
};
