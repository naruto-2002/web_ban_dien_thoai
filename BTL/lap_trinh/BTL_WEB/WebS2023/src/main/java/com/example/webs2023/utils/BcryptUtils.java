package com.example.webs2023.utils;

import org.mindrot.jbcrypt.BCrypt;

public class BcryptUtils {
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }

    public static boolean checkPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }

    public static void main(String[] args) {
        System.out.println(hashPassword("123"));
    }
}
