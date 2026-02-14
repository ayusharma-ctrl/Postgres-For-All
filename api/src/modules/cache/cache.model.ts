import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes
} from "sequelize";
import { sequelize } from "../../db";

export class Cache extends Model<
    InferAttributes<Cache>,
    InferCreationAttributes<Cache>
> {
    declare key: string;
    declare value: object;
    declare expires_at: Date;
}

Cache.init(
    {
        key: {
            type: DataTypes.STRING,
            primaryKey: true
        },

        value: {
            type: DataTypes.JSONB,
            allowNull: false
        },

        expires_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "cache",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    }
);
