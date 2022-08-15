import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

import { Button } from '../../ui/Button';
import { FormErrorMessage } from '../../ui/FormErrorMessage';
import { FormGroup } from '../../ui/FormGroup';
import { FormInput } from '../../ui/FormInput';
import { FormLabel } from '../../ui/FormLabel';
import { Logo } from '../../ui/Logo';
import { FormValues, initialValues, validationSchema } from './form';

interface IProps {
    values?: FormValues;
}

const CreateAccount = ({ values = initialValues }: IProps) => {
    const router = useRouter();

    const handleClick = () => router.push('/entrar');

    const handleSubmit = (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        console.log(values);
        actions.setSubmitting(false);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <Logo size="4xl" />
            <Formik
                initialValues={values}
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
                            <FormLabel htmlFor="fullName">
                                Nome completo
                            </FormLabel>
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
                            Criar conta
                        </Button>
                    </Form>
                )}
            </Formik>
            <p className="mt-2 text-end">
                Já possui uma conta?{' '}
                <Button variant="link" onClick={handleClick}>
                    Entrar
                </Button>
                .
            </p>
        </div>
    );
};

export { CreateAccount };
