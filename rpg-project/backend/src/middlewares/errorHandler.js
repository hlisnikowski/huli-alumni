import chalk from "chalk";
import ResponseError from "../utils/ResponseError.js";

const errorJsonResponse = (error, messageText) => {
    // If messageText is not provided show message form error
    const errorMessage = messageText || error.message;

    return {
        status: "ERROR",
        message: errorMessage,
        error: [
            {
                name: error.name,
                status: error.status,
                message: error.message,
                stack: error.stack,
            },
        ],
    };
};

export const errorHandler = (error, req, res, next) => {
    let httpStatusCode, message;
    if (error instanceof ResponseError) {
        console.log(chalk.red(`ERROR : [${new Date().toLocaleString()}] -> ${error.errorMessage}`));
        httpStatusCode = error.statusCode;
        message = error.errorMessage;
    } else {
        console.log(chalk.red(`UNHANDLED ERROR [${new Date().toLocaleString()}] -> ${error.stack}`));
        httpStatusCode = 500;
        message = `Internal Server Error: ${error.message}`;
    }

    return res.status(httpStatusCode).json(errorJsonResponse(error, message));
};
