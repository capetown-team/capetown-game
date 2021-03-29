import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class UserTheme extends Model<UserTheme> {
        @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    id_theme: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    id_user: number;
}
