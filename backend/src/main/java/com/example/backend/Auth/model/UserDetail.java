package com.example.backend.Auth.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDetail {
    private String firstName = ""; // Default to an empty string
    private String lastName = "";  // Default to an empty string
    private String phoneNo = "";    // Default to an empty string
    private List<BillingAddress> addresses = new ArrayList<>(); // Initialize as an empty list
    private List<CardDetails> cardDetails = new ArrayList<>();        // Initialize as a default CardDetails 
}

class CardDetails {
    private String cardNumber = "";
    private String cardHolderName = "";
    private String expirationDate = "";
    private String cvv = "";
    private boolean isPrimary = false; // Default to not primary
}

class BillingAddress {
    private String address = "";
    private String city = "";
    private String state = "";
    private String zipCode = "";
    private String country = "";
    private String phone = "";
    private boolean isPrimary = false; // Default to not primary
}
