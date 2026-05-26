package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostareRepository extends JpaRepository<Postare, Long> {
	List<Postare> findByUserId(Long userId);
}