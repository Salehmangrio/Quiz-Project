import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Handles user login.
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Return user data and token
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Handles user registration.
 */
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', // Default to 'user' if no role is provided
        });

        // Save user to database
        await user.save();

        // Return success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Handles user logout.
 */
export const logout = (req, res) => {
    // Invalidate the token on the client side
    res.status(200).json({ message: 'User logged out successfully' });
};

/**
 * Handles password reset.
 */
export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Handles email verification.
 * TODO: Implement email verification logic.
 */
export const verifyEmail = async (req, res) => {
    // Implement logic if needed.
    res.status(501).json({ message: 'Email verification not implemented yet' });
};
