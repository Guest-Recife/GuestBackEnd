import { verify } from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../constants/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'INVALID_TOKEN' });

  const [,  token] = authHeader.split(' ');

  try {
    const decoded = await promisify(verify)(token, authConfig.secret);

    req.auth_data = {
      user_id: decoded.id
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'INVALID_TOKEN' });
  }
};
