package com.bet.Models;

import java.util.List;

public class Market {
    private String key;
    private String last_update;
    private List<Outcome> outcomes;

    // Getters and Setters
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLast_update() {
        return last_update;
    }

    public void setLast_update(String last_update) {
        this.last_update = last_update;
    }

    public List<Outcome> getOutcomes() {
        return outcomes;
    }

    public void setOutcomes(List<Outcome> outcomes) {
        this.outcomes = outcomes;
    }

    @Override
    public String toString() {
        return "Market{" +
                "key='" + key + '\'' +
                ", last_update='" + last_update + '\'' +
                ", outcomes=" + outcomes +
                '}';
    }
}
