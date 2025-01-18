package com.example.backend.Auth.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDetail {
    private String firstName;
    private String lastName;
    private List<BillingAddress> addresses;  // Assuming multiple email addresses
    private CardDetails cardDetails;     // Securely stored card details
}

class CardDetails {
    private String cardNumber;
    private String cardHolderName;
    private String expirationDate;
    private String cvv;
    private boolean isPrimary;
}

class BillingAddress {
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String phone;
    private boolean isPrimary; 
}

