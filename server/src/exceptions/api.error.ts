export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string,) {
        super(message)
        this.status = status
    }

    static UnatrorizatedError() {
        return new ApiError(403, 'Failed to authorize user')
    }

    static BadRequest(message: string) {
        return new ApiError(400, message)
    }
}