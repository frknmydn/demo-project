import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      'asfg'
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};

//Bu middleware fonksiyonu, gelen isteklerdeki jtleri kontrol eder, 
//isteği yapan kullanıcının kimliğinidogrular 
//  diğer middleware ve route handler fonksiyonları içinde kullanıcının 
//kimliği ve kimlik bilgilerine erisilebilir. 
//Eğer JWT belirteci bulunmuyorsa veya geçersiz ise, kullanıcının kimliği tanımlanamaz ve istek işlenemez.