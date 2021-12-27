console.log("Holaaa");
import {Sequelize} from "sequelize";

export const sequelize = new Sequelize({
    dialect: "postgres",
    username: "jwacmxlwdocmko",
    password: "fc5aa116d81d84a4c13231fc6f05c03a339af6551278977b5ceb8597adf3485c",
    database: "dqrbg5n2r3bj4",
    port: 5432,
    host: "ec2-3-226-211-228.compute-1.amazonaws.com",
    ssl: true,
    // esto es necesario para que corra correctamente
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
});