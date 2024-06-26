package com.bet.Models;


public class Outcome {
    private String name;
    private int price;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Outcome{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}


