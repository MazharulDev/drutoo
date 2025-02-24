import { Request, Response, NextFunction } from "express";

type RateLimitOptions = {
    windowMs: number;
    max: number;
    message: object;
};

const rateLimitStore = new Map<string, { count: number; expires: number }>();

export default function rateLimit(options: RateLimitOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

        const currentTime = Date.now();
        const record = rateLimitStore.get(ip as string);

        if (!record || record.expires < currentTime) {
            rateLimitStore.set(ip as string, { count: 1, expires: currentTime + options.windowMs });
        } else {
            record.count++;
            if (record.count > options.max) {
                return res.status(429).json(options.message);
            }
            rateLimitStore.set(ip as string, record);
        }

        next();
    };
}
