const exception_formatter = (exception, request, response, next_middleware) => {
    let { status = 500, message, data } = exception;

    message = (status === 500 || !message) ? 'Has occurred an unexpected exception. Internal server error.' : message;

    exception = {
        status_code: status,
        message: message,
        exception_data: {
            ...(data) & data,
        },
    };

    response.status(exception.status_code).send(exception);
};

export default exception_formatter;