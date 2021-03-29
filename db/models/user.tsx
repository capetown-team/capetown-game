import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
        @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    first_name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    second_name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    login: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    phone: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;
}
