package br.com.fatec.api.repository;

import br.com.fatec.api.model.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long>{
    // O Spring gera automaticamente: SELECT * FROM produto WHERE nome LIKE %?%
    Page<Produto> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
    Page<Produto> findByCategoriaId(Long categoriaId, Pageable pageable);
}
