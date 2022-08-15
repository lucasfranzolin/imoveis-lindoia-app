import * as Yup from 'yup';

export type FormValues = {
    fullName: string;
    email: string;
    password: string;
};

export const initialValues: FormValues = {
    fullName: '',
    email: '',
    password: '',
};

export const validationSchema: Yup.SchemaOf<FormValues> = Yup.object().shape({
    fullName: Yup.string()
        .min(3, 'Nome deve conter 3 letras no mínimo.')
        .required('Campo obrigatório.'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório.'),
    password: Yup.string().required('Campo obrigatório.'),
});
