import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export function authmiddleware(req: Request, res: Response, next: NextFunction) {
    const header=req.headers.authorization?.toString()
    if (!header || !header.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return
    }
    const token = header.split(' ')[1];
    if(!token){
        res.status(403).send('Unauthorized');
        return
    }
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET!) as {userId:string};
        if(!decoded.userId){
            res.status(403).send('Unauthorized');
            return
        }
        //typescript dont allow to add custom properties to req object
        //so we use type assertion to tell typescript that req is of type Request with userId property in express.d.ts
        req.userId=decoded.userId
        next();
    }
    catch(e){
        console.error(e);
        res.status(403).send('Error in authentication');
        return
    }
}