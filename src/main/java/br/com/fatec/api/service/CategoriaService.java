package br.com.fatec.api.service;

import br.com.fatec.api.dto.CategoriaRequestDTO;
import br.com.fatec.api.dto.CategoriaResponseDTO;
import br.com.fatec.api.model.Categoria;
import br.com.fatec.api.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository repository;

    public Page<CategoriaResponseDTO> listar(Pageable pageable) {
        return repository.findAll(pageable).map(CategoriaResponseDTO::fromEntity);
    }

    public Page<CategoriaResponseDTO> buscarPorNome(String nome, Pageable pageable) {
        return repository.findByNomeContainingIgnoreCase(nome, pageable).map(CategoriaResponseDTO::fromEntity);
    }

    public CategoriaResponseDTO salvar(CategoriaRequestDTO dto) {
        Categoria categoria = new Categoria();
        categoria.setNome(dto.nome());
        return CategoriaResponseDTO.fromEntity(repository.save(categoria));
    }
}