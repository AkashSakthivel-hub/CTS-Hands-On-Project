package com.cognizant.jwt_authentication.model;

public class AuthRequest {
    private String username;
    private String password;

    // Getter
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // Setter
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
