import { flatten } from '@nestjs/common';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const config: SqlServerConnectionOptions = {
  type: 'mssql',
  host: '139.59.104.129',
  port: 1433,
  username: 'sa',
  password: 'Qq123456789',
  database: 'apartment',
  // entities: ['dist/src/**/*.entity.js'],
  entities: ['dist/output/entities/*js'],
  synchronize: true,
  migrations: ['dist/src/db/migrations/*js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
