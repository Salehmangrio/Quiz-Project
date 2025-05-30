import * as yup from 'yup';

/**
 * Helper to validate Yup schemas.
 */
const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const messages = error.errors || ['Invalid input'];
    res.status(400).json({ message: messages.join(', ') });
  }
};

/**
 * Schema and middleware for login.
 */
const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const validateLogin = validate(loginSchema);

/**
 * Schema and middleware for registration.
 */
const registerSchema = yup.object().shape({
  name: yup.string().min(2).max(50).required('Name is required'),
  username: yup.string().min(3).max(20).required('Username is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().oneOf(['user', 'admin'], 'Role must be either user or admin').default('user'),
});

export const validateRegister = validate(registerSchema);
