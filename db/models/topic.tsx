import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Topic extends Model<Topic> {
        @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    content: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    id_author: number;
}
