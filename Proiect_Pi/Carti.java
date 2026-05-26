package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*")
public class Carti {

    @GetMapping("/resurse-pisici")
    public JsonNode getCartiPisici() {
       
    	 try {
    	        HttpClient client = HttpClient.newHttpClient();
    	        
    	        URI uri = URI.create("https://www.googleapis.com/books/v1/volumes?q=subject:cats+care+breeds&maxResults=12&langRestrict=en");
    	        HttpRequest cerere = HttpRequest.newBuilder()
    	                .uri(uri)
    	                .GET().build();
    	      
    	        HttpResponse<String> raspuns = client.send(cerere, HttpResponse.BodyHandlers.ofString());
    	        ObjectMapper mapper=new ObjectMapper();
    	        return mapper.readTree(raspuns.body());
    	      
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
      }
}