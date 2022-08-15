import * as Yup from 'yup';

export type FormValues = {
    email: string;
    password: string;
};

export const initialValues: FormValues = {
    email: '',
    password: '',
};

export const validationSchema: Yup.SchemaOf<FormValues> = Yup.object().shape({
    email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório.'),
    password: Yup.string().required('Senha é obrigatória.'),
});
