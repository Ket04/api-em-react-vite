package br.com.fatec.api.dto;

import br.com.fatec.api.model.Categoria;

public record CategoriaResponseDTO(Long id, String nome) {
    public static CategoriaResponseDTO fromEntity(Categoria categoria) {
        return new CategoriaResponseDTO(categoria.getId(), categoria.getNome());
    }
}