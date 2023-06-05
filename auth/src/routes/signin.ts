import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signin',[
    body('email')
    .isEmail()
    .withMessage('email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('you must supply a password')

],
validateRequest,
async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('invalid credentials');
    }

    const passwordMatch = await Password.compare(
        existingUser.password,
        password
    );
    if (!passwordMatch) {
        throw new BadRequestError('invalid credentials');
    }

    const userJWT = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email
        },
        'asfg'
    );

    req.session = {
        jwt: userJWT
    };

    // JWT'yi Authorization başlığı altında gönder
    res.status(200).send({
        user: existingUser,
        token: userJWT
    });
});

export { router as signinRouter };