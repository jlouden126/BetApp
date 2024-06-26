package com.bet;

import com.bet.Models.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BetController {

    private final ApiClient apiClient;

    @Autowired
    public BetController(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    @GetMapping("/bets")
    public List<Game> getBets() {
        apiClient.getBetList();
        return apiClient.selectBetList();
    }
}

