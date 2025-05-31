import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username too short')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password too short')
        .required('Required'),
});