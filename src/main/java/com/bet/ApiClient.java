package com.bet;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.List;

import com.bet.Models.Game;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.response.ValidatableResponse;
import io.restassured.path.json.JsonPath;
import net.serenitybdd.rest.SerenityRest;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Component;



import static net.serenitybdd.rest.SerenityRest.given;

@Component
public class ApiClient {
    public ValidatableResponse getData() {
        return given()
        .relaxedHTTPSValidation()
        .header("Content-TYpe","application/json")
        .when()
        .get("https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=ba522e4be7aa62ec844f34a9118b92e1")
        .then();
    }

    public void getBetList() {
        this.getData();
        selectBetList();
    }

    public List<Game> selectBetList() {
        String jsonResponse = SerenityRest.lastResponse().getBody().asString();
        JsonPath jsonData = new JsonPath(jsonResponse);
        List<Game> games = jsonData.getList("", Game.class);
        return games;
    }


}

