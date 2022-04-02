import { flatten } from '@nestjs/common';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const config: SqlServerConnectionOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: '@Shadow123',
  database: 'apartment',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/src/db/migrations/*js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
