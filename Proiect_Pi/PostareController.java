package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;


@RestController
@RequestMapping("/postari")
@CrossOrigin(origins = "*")
public class PostareController { 

    // Folderul unde salvam pozele
    public static String FOLDER_POZE = System.getProperty("user.dir") + "/poze_postari";
    
    @Autowired
    private PostareRepository postareRepository; 
   
    
    //metoda de adaugare o postare
    @PostMapping("/adauga")
    public ResponseEntity<String> adaugaPostare(
        
            @RequestParam("numeAutor") String numeAutor,
            @RequestParam("descriere") String descriere,
            @RequestParam("userId") Long userId,
            @RequestParam(value="fisierPoza", required=false) MultipartFile fisierPoza
    ){
        
        try {
            
            Postare postareNoua = new Postare();
            
            postareNoua.setUserId(userId);     
            postareNoua.setDescriere(descriere);       
            postareNoua.setDataPostare(LocalDateTime.now());

            if (fisierPoza != null && !fisierPoza.isEmpty()) {
            	
                String numeFisier = System.currentTimeMillis() + "_" + fisierPoza.getOriginalFilename();
                Path caleFisier = Paths.get(FOLDER_POZE, numeFisier);
                
                if (!Files.exists(Paths.get(FOLDER_POZE))) {
                    Files.createDirectories(Paths.get(FOLDER_POZE));
                }
                
                Files.write(caleFisier, fisierPoza.getBytes());
                
                postareNoua.setNumePoza(numeFisier);
            }

            //salvam totul in baza de date
            postareRepository.save(postareNoua);

            //afisam mesajul 
            return ResponseEntity.ok("Postare adăugată cu succes!");
            
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Eroare la salvarea pozei");
        }
    }
    
    //metoda care afiseaza postarile pe ecran 
    @GetMapping("/toate")
    public java.util.List<Postare> toatePostarile(){
    	return postareRepository.findAll(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC,"id"));
    }
   
}