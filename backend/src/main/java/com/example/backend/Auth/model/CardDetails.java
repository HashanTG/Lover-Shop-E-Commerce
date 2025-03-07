package com.example.backend.Auth.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class CardDetails {

    private String cardNumber;
    private String cardHolderName;
    private String expirationDate;
    private String cvv;
    private boolean isPrimary; // Default to not primary
}