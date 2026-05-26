package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET}) 
public class RobotController {

    @Autowired
    private PostareRepository postareRepository;

    @PostMapping("/intreaba")
    public String intreaba(@RequestParam("mesaj") String mesaj, @RequestParam("userId") Long userId) {
        
        //luam postarile din baza de date
        List<Postare> postari = postareRepository.findByUserId(userId);
        
        StringBuilder istoric = new StringBuilder();
        if (postari == null || postari.isEmpty()) {
            istoric.append("Utilizatorul nu are postări încă.");
        } else {
            for (Postare p : postari) {
                istoric.append(p.getDescriere()).append(". ");
            }
        }

        try {
            HttpClient client = HttpClient.newHttpClient();
            ObjectMapper mapper = new ObjectMapper();
            
            String instructiuniSistem = "Ești un asistent prietenos " + "În postări ai putea găsi informații despre pisica utilizatorului" + "Nu folosi exemple fixe, ci adaptează-te la orice scrie în istoric." +
                    "Sarcina ta este să analizezi istoricul de postări furnizat și să găsești subiecte de conversație în el. " + 
                    "Dacă observi un eveniment recent (o aniversare, o ieșire, o schimbare), menționează-l scurt și pune o întrebare naturală despre el pentru a continua discuția. " +
                    "Dacă istoricul este gol, fii doar un asistent prietenos. " +
                    "Vorbește natural, pe un ton relaxat, în limba română. " + 
                    "Istoricul curent este: " + istoric.toString().replace("\"", "'");

            String jsonBody = """
                    {
                        "model": "llama-3.3-70b-versatile",
                        "messages": [
                                {"role": "system", "content": "%s"},
                                {"role": "user", "content": "%s"}
                        ]
                    }
                    """.formatted(instructiuniSistem.replace("\n", " "), mesaj.replace("\"", "'"));

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer PUNE_AICI_CHEIA_TA_GROQ_API")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();
                
            String responseBody = client.send(request, HttpResponse.BodyHandlers.ofString()).body();
            JsonNode node = mapper.readTree(responseBody);
            
            return node.get("choices").get(0).get("message").get("content").asText();
            
        } catch (Exception e) {
            return "Eroare: " + e.getMessage();
        }
    }
}