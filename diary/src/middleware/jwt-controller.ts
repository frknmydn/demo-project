import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'asfg', (err:any) => {
      if (err) {
        // Invalid token
        console.error(err.message);
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    
    res.sendStatus(401);
  }
};

export {authenticateJWT}