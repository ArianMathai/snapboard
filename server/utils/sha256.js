import crypto from 'crypto';

export function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

export function verifyPassword(plainPassword, storedHash) {
    const hashedPassword = hashPassword(plainPassword);
    return hashedPassword === storedHash;
}