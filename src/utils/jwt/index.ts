import { JWT_OPTIONS } from '@app/config/jwt-options';
import jwt from 'jsonwebtoken';

const sign = (payload: {}) => {
  const secretKey = `${JWT_OPTIONS.secretOrKey}`;

  return jwt.sign(payload, secretKey, {
    expiresIn: '24h'
  });
};

export const jwtService = {
  sign
};

export interface IJwtPayload {
  userId: string;
}
