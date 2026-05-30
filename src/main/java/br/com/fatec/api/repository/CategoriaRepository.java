package br.com.fatec.api.repository;

import br.com.fatec.api.model.Categoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    // Resolução do desafio extra
    Page<Categoria> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}