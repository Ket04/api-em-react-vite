package br.com.fatec.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record CategoriaRequestDTO(
        @Schema(example = "Eletrônicos")
        @NotBlank(message = "O nome da categoria é obrigatório")
        String nome
) {}