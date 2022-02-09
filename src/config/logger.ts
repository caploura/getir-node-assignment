export const loggerOptions = {
  options: {
    file: {
      level: "info",
      filename: "./logs/app.log",
      handleExceptions: true,
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: true,
      timestamp: true,
    },
    console: {
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  },
};
