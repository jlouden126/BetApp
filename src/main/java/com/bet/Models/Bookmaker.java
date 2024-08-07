package com.bet.Models;

import java.util.List;

public class Bookmaker {
    private String key;
    private String title;
    private String last_update;
    private List<Market> markets;

    // Getters and Setters
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLast_update() {
        return last_update;
    }

    public void setLast_update(String last_update) {
        this.last_update = last_update;
    }

    public List<Market> getMarkets() {
        return markets;
    }

    public void setMarkets(List<Market> markets) {
        this.markets = markets;
    }

    @Override
    public String toString() {
        return "Bookmaker{" +
                "key='" + key + '\'' +
                ", title='" + title + '\'' +
                ", last_update='" + last_update + '\'' +
                ", markets=" + markets +
                '}';
    }
}
