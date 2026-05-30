package br.com.fatec.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false, length = 60) // O hash BCrypt possui exatamente 60 caracteres
    private String senha;

    private String nome;

    @Enumerated(EnumType.STRING)
    private Role role; // ADMIN ou USER
}
