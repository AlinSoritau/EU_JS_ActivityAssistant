import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_debug_key'

interface UserPayload {
    id: number;
    username: string;
}

interface TokenPayload {
    userId: number,
    email: string
}

export function generateToken(user: UserPayload): string {
    const payload: TokenPayload = {
        userId: user.id,
        email: user.username
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    return token;
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {TokenPayload} - Decoded payload if valid
 * @throws {Error} - If token is invalid or expired
 */
export function verifyToken(token: string): TokenPayload {
  try {
    // Verify token signature and expiration
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    // Token is invalid, expired, or malformed
    throw new Error('Invalid or expired token');
  }
}