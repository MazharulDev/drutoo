"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rateLimitStore = new Map();
function rateLimit(options) {
    return (req, res, next) => {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
        const currentTime = Date.now();
        const record = rateLimitStore.get(ip);
        if (!record || record.expires < currentTime) {
            rateLimitStore.set(ip, { count: 1, expires: currentTime + options.windowMs });
        }
        else {
            record.count++;
            if (record.count > options.max) {
                return res.status(429).json(options.message);
            }
            rateLimitStore.set(ip, record);
        }
        next();
    };
}
exports.default = rateLimit;
