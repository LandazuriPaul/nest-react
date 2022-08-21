/* eslint-disable @typescript-eslint/naming-convention */
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';

import { DotenvParseOutput, parse } from 'dotenv';
import joi from 'joi';
import { InternalServerErrorException, Logger } from '@nestjs/common';

const { number, object, string } = joi.types();

export class ConfigService {
  public rootDir: string;
  public runningDir: string;

  private readonly configSchema = object.keys({
    CORS_WHITELIST: string.required(),
    HOST: string.required(),
    PORT: number.default(4000),
    SECRET_JWT_KEY: string.required(),
  });
  private envConfig: DotenvParseOutput;
  private logger = new Logger(ConfigService.name);

  constructor() {
    this.rootDir = `${join(process.cwd())}`;
    this.runningDir = `${join(this.rootDir, process.env.baseUrl || '')}`;

    // extract and validate config from ${NODE_ENV}.env file or CONFIG_PATH & SECRETS_PATH
    let config: DotenvParseOutput;
    const { CONFIG_PATH: configPath, SECRETS_PATH: secretsPath } = process.env;
    if (configPath && secretsPath) {
      config = this.getConfigFromVolumes(configPath, secretsPath);
    } else {
      config = this.getConfigFromEnvFile(process.env.NODE_ENV);
    }
    this.envConfig = this.validateInput(config);
  }

  /**
   * Extract the configuration from a `dotenv` file
   * @param env The environment name. Corresponding `name.env` file will be used. Default to `local`
   */
  private getConfigFromEnvFile(env = 'local'): DotenvParseOutput {
    const envFilePath = join('env', `${env}.env`);
    try {
      const config = parse(readFileSync(envFilePath));
      return config;
    } catch (err) {
      const msg = `Configuration error, see below:

/!\\ No environment definition found at ${envFilePath}. Please choose one of the following options (in preference order):
  1. Set both the CONFIG_PATH and the SECRETS_PATH environment variables and fill their respective folders with corresponding environment values.
  2. Set the NODE_ENV environment variable and attach the corresponding "dotenv" file to the server.

`;
      this.logger.error(msg);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Extract the configuration from both the `config` and `secrets` folders.
   * @param configPath Path to the open `configurations` directory
   * @param secretsPath Path to the `secrets` directory
   */
  private getConfigFromVolumes(
    configPath: string,
    secretsPath: string
  ): DotenvParseOutput {
    const configFiles = readdirSync(configPath).filter(
      file => !file.includes('..')
    );
    const secretsFiles = readdirSync(secretsPath).filter(
      file => !file.includes('..')
    );
    const config: DotenvParseOutput = {};
    configFiles.reduce((partialConfig, file) => {
      partialConfig[file] = this.extractConfigFromFile(join(configPath, file));
      return partialConfig;
    }, config);
    secretsFiles.reduce((partialConfig, file) => {
      partialConfig[file] = this.extractConfigFromFile(join(secretsPath, file));
      return partialConfig;
    }, config);
    return config;
  }

  /**
   * Extract the configuration string from a file
   * @param filePath File path to read the config from
   */
  private extractConfigFromFile(filePath: string): string {
    const fileContent = readFileSync(filePath).toString().trim();
    return fileContent;
  }

  /**
   * Validate the configuration object against the required configuration schema
   * using the Joi library.
   * @param envConfig The config object
   */
  private validateInput(envConfig: DotenvParseOutput): DotenvParseOutput {
    const { error, value: validatedEnvConfig } =
      this.configSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    this.printConfig(validatedEnvConfig);
    return validatedEnvConfig;
  }

  /**
   * Safely prints the server configuration. All secret values will be hidden.
   * @param envConfig
   */
  private printConfig(envConfig: DotenvParseOutput): void {
    const config = Object.keys(envConfig)
      .filter(key => !key.includes('SECRET'))
      .reduce((obj, key) => {
        obj[key] = envConfig[key];
        return obj;
      }, {} as DotenvParseOutput);
    const secrets = Object.keys(envConfig).filter(key =>
      key.includes('SECRET')
    );
    this.logger.log(
      `Server configuration:\n${JSON.stringify(config, null, 2)}`
    );
    this.logger.log(`Server secrets:\n${JSON.stringify(secrets, null, 2)}`);
  }

  /**
   * Config getters
   */

  get corsWhiteList(): string[] {
    return this.envConfig.CORS_WHITELIST.split(',');
  }

  get host(): string {
    return String(this.envConfig.HOST);
  }

  get port(): number {
    return parseInt(this.envConfig.PORT, 10);
  }

  /**
   * Secret getters
   */

  get secretJwtKey(): string {
    return String(this.envConfig.SECRET_JWT_KEY);
  }
}
