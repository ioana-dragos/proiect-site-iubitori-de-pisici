package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/register")
	public ResponseEntity<?> inregistrare(@RequestParam String nume, @RequestParam String email, @RequestParam String parola) {
		if(userRepository.findByEmail(email).isPresent()) {
			return ResponseEntity.badRequest().body("Email deja folosit!");
		}
		User u = new User();
		u.setNume(nume);
		u.setEmail(email);
		u.setParola(parola);
		User salvat = userRepository.save(u);
		return ResponseEntity.ok(salvat);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> conectare(@RequestParam String email, @RequestParam String parola) {
		Optional<User> userOpt = userRepository.findByEmail(email);
		if(userOpt.isPresent() && userOpt.get().getParola().equals(parola)) {
			return ResponseEntity.ok(userOpt.get()); 
		} else {
			return ResponseEntity.status(401).body("Email sau parola gresita!");
		}
	}

	@PostMapping("/modificare-parola")
	public ResponseEntity<String> modificareParola(@RequestParam String email, @RequestParam String parolaNoua) {
		Optional<User> userOpt = userRepository.findByEmail(email);
		if(userOpt.isPresent()) {
			User u = userOpt.get();
			u.setParola(parolaNoua);
			userRepository.save(u);
			return ResponseEntity.ok("Parola a fost modificata!");
		}
		return ResponseEntity.status(404).body("Utilizator negasit!");
	}
}