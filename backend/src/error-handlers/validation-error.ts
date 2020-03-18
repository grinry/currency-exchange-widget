export const validationError = (key: string, message: string) => {
    throw new ValidationError(key, message);
};

export class ValidationError extends Error {
    public key: string;
    constructor(key: string, message: string) {
        super(message);
        this.key = key;
    }
}
