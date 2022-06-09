import { flatten } from '@nestjs/common';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

const config: SqlServerConnectionOptions = {
  type: 'mssql',
  host: '139.59.104.129',
  port: 1433,
  username: 'sa',
  password: 'Qq123456789',
  database: 'apartment',
  entities: ['dist/entities/*js'],
  synchronize: true,
};

export default config;
