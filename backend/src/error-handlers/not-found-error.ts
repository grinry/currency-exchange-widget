export const notFoundError = (message: string = 'Resource was not found.') => {
    throw new NotFoundError(message);
};

export class NotFoundError extends Error {
    constructor(message: string = 'Resource was not found.') {
        super(message);
    }
}
