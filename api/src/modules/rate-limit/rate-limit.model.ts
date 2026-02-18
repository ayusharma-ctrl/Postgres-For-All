import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes
} from "sequelize";
import { sequelize } from "../../db";


export class RateLimit extends Model<
    InferAttributes<RateLimit>,
    InferCreationAttributes<RateLimit>
> {
    declare key: string;
    declare count: number;
    declare window_start: Date;
}


RateLimit.init(
    {
        key: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        window_start: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "rate_limits",
        timestamps: false
    }
);
