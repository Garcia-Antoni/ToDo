class HttpException extends Error {
    // Creating a mold for futures responses.
    constructor(status_code, message, exception_data) {
        super(message);

        this.status = status_code;
        this.data = exception_data;
    }
}

export default HttpException;