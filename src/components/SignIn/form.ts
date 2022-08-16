import * as Yup from 'yup';

import { SignInParams } from '../../types/auth';

export const initialValues: SignInParams = {
    email: '',
    password: '',
};

export const validationSchema: Yup.SchemaOf<SignInParams> = Yup.object().shape({
    email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório.'),
    password: Yup.string().required('Senha é obrigatória.'),
});
