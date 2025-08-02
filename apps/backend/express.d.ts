declare namespace Express {
    export interface Request {
        userId?: string; // Custom property to store user ID after authentication
    }
}