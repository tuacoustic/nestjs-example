import { initialState1678673901834 } from "src/config/mysql/migration/1678673901834-initialState";
import { UserEntity } from "src/users/users.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'gkitchen',
    entities: [UserEntity],
    synchronize: false,
    migrations: [initialState1678673901834],
    logging: true
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;