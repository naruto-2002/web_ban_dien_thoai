package com.example.webs2023.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static Connection instance;

    public static Connection getInstance() throws SQLException, ClassNotFoundException {
        if(instance == null) {
            String dbDriver = "org.postgresql.Driver";
            String dbURL = "jdbc:postgresql://localhost:5432/";

            String dbName = "cell_phone";
            String dbUsername = "postgres";
            String dbPassword = "@Ptit123";

            Class.forName(dbDriver);
            instance = DriverManager.getConnection(dbURL + dbName,
                    dbUsername,
                    dbPassword);
        }
        return instance;
    }
}
