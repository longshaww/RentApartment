import { flatten } from '@nestjs/common';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const config: SqlServerConnectionOptions = {
  type: 'mssql',
  host: '95.111.203.4',
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
