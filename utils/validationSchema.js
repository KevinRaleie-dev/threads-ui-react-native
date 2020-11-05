import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    username: yup.string().required().min(2).max(50).label('Username'),
    email: yup.string().email().required().max(255).label('Email'),
    password: yup.string().required().min(6).max(100).label('Password')
});