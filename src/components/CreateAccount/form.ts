import * as Yup from 'yup';

import { SignUpParams } from '../../types/auth';

export const initialValues: SignUpParams = {
    fullName: '',
    email: '',
    password: '',
};

export const validationSchema: Yup.SchemaOf<SignUpParams> = Yup.object().shape({
    fullName: Yup.string()
        .min(3, 'Nome deve conter 3 letras no mínimo.')
        .required('Campo obrigatório.'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório.'),
    password: Yup.string().required('Campo obrigatório.'),
});
