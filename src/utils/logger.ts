import winston, { format } from "winston";
import { loggerOptions } from "../config/logger";

import * as fs from "fs";

const { combine, timestamp, label, printf } = format;

export class Logger {
  private logger: winston.Logger;

  private static instance: Logger;

  private constructor() {
    this.logger = winston.createLogger({
      format: combine(label({ label: "LOG" }), timestamp(), this.myFormat),
      transports: [
        new winston.transports.Console(loggerOptions.options.console),
        new winston.transports.File(loggerOptions.options.file),
      ],
    });
  }

  private myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

  private static getLoggerInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private static createLogFilesystemConfig() {
    const logDirectory: string = loggerOptions.options.file.filename.substring(
      0,
      loggerOptions.options.file.filename.lastIndexOf("/")
    );

    if (!fs.existsSync(logDirectory)) {
      console.log(
        `Creating filesystem configuration for log file: ${loggerOptions.options.file.filename}`
      );
      fs.mkdirSync(logDirectory);
    }
  }

  public static getLogger() {
    Logger.createLogFilesystemConfig();
    let _logger = Logger.getLoggerInstance();
    return _logger.logger;
  }
}
