package br.com.fatec.api.dto;

import br.com.fatec.api.model.Produto;

public record ProdutoResponseDTO(
        Long id,
        String nome,
        Double preco,
        CategoriaResponseDTO categoria // Retornamos o DTO da categoria, não a Entity
) {
    // Método utilitário para converter de Entity para DTO
    public static ProdutoResponseDTO fromEntity(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                CategoriaResponseDTO.fromEntity(produto.getCategoria())
        );
    }
}