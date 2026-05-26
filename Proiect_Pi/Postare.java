package com.example.demo;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "postari")
public class Postare {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="postare")
	private String numePoza;

	@Column(name="descriere")
	private String descriere;
	
	@Column(name="data_postare")
	private LocalDateTime dataPostare;
	
	private String numeAutor;
	
	public String getNumeAutor() {
		return numeAutor;
	}

	public void setNumeAutor(String numeAutor) {
		this.numeAutor = numeAutor;
	}

	@Column(name = "user_id")
	private Long userId;
	
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Postare() {}
	
	public Postare(Long userId,String descriere, LocalDateTime dataPostare)
	{
		this.userId=userId;
		this.descriere=descriere;
		this.dataPostare=dataPostare;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumePoza() {
		return numePoza;
	}

	public void setNumePoza(String numePoza) {
		this.numePoza = numePoza;
	}

	public String getDescriere() {
		return descriere;
	}

	public void setDescriere(String descriere) {
		this.descriere = descriere;
	}

	public LocalDateTime getDataPostare() {
		return dataPostare;
	}

	public void setDataPostare(LocalDateTime dataPostare) {
		this.dataPostare = dataPostare;
	}

}
