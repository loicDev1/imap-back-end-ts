import { User } from 'src/user/entities/User.entity';
import { sign, verify } from 'jsonwebtoken';

export async function generateTokenForUser(
  partialUser: Partial<User>,
): Promise<any> {
  const options = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    data: partialUser,
  };
  return new Promise((resolve, reject) => {
    sign(options, process.env.JWT_SECRET, function (error, token) {
      if (error) return reject(error);
      resolve(token);
    });
  });
}

export async function verifyToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}


export async function decodeJwtTokenToUser(token: string): Promise<any>{
  return await verifyToken(token)
}
