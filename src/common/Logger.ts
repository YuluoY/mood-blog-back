// custom-logger.service.ts
import { resolve } from 'path';
import { Logger } from 'typeorm';
import * as winston from 'winston';

export class CustomLogger implements Logger {
  private readonly logger: winston.Logger;
  private readonly loggerPath: string = resolve(__dirname, '../log');

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(), // JSON format for logs
        winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`) // Custom log format
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ dirname: this.loggerPath, filename: 'error.log', level: 'error' }),
        new winston.transports.File({ dirname: this.loggerPath, filename: 'info.log', level: 'info' }),
        new winston.transports.File({ dirname: this.loggerPath, filename: 'warn.log', level: 'warn' }),
        new winston.transports.File({ dirname: this.loggerPath, filename: 'debug.log', level: 'debug' }),
        new winston.transports.File({ dirname: this.loggerPath, filename: 'verbose.log', level: 'verbose' })
      ]
    });
  }

  logQuery(query: string, parameters?: any[], queryRunner?: import('typeorm').QueryRunner): any {
    // Log your queries here
    this.logger.info(`Query: ${query}`);
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: import('typeorm').QueryRunner): any {
    // Log query errors here
    this.logger.error(`QueryError: ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: import('typeorm').QueryRunner): any {
    // Log slow queries here
    this.logger.warn(`SlowQuery: ${time}ms - ${query}`);
  }

  logSchemaBuild(message: string, queryRunner?: import('typeorm').QueryRunner): any {
    // Log schema build messages here
    this.logger.info(`SchemaBuild: ${message}`);
  }

  logMigration(message: string, queryRunner?: import('typeorm').QueryRunner): any {
    // Log migration messages here
    this.logger.info(`Migration: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: import('typeorm').QueryRunner): any {
    // Log general messages here
    // this.logger.log(level, message);
    this.logger[level](message);
  }
}
