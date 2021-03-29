import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Theme extends Model<Theme> {
        @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    hidden: boolean;

    @AllowNull(false)
    @Column(DataType.JSON)
    data: JSON;
}
