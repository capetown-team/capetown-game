import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Comment extends Model<Comment> {
        @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    content: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    id_topic: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    id_user: number;
}
