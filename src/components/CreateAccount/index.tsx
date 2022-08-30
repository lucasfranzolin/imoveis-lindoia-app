import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { SignUpParams } from '../../types/auth';
import { Button } from '../../ui/system/Button';
import { FormErrorMessage } from '../../ui/system/FormErrorMessage';
import { FormGroup } from '../../ui/system/FormGroup';
import { FormInput } from '../../ui/system/FormInput';
import { FormLabel } from '../../ui/system/FormLabel';
import { initialValues, validationSchema } from './form';

export const CreateAccount = () => {
    const router = useRouter();
    const {
        signUp: [{ success }, fetchSignUp],
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
                    <FormGroup
                        required
                        error={
                            !!formik.errors.fullName &&
                            !!formik.touched.fullName
                        }
                    >
                        <FormLabel htmlFor="fullName">Nome completo</FormLabel>
                        <FormInput
                            type="text"
                            id="fullName"
                            name="fullName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                        />
                        <FormErrorMessage>
                            {formik.errors.fullName}
                        </FormErrorMessage>
                    </FormGroup>
                    <FormGroup
                        required
                        error={!!formik.errors.email && !!formik.touched.email}
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
