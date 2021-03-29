import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Reply extends Model<Reply> {
        @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    content: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    id_comment: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    id_user: number;
}
