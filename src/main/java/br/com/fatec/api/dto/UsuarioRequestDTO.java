package br.com.fatec.api.dto;

import br.com.fatec.api.model.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UsuarioRequestDTO(
        @Schema(example = "James Campos")
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @Schema(example = "james@fatec.sp.gov.br")
        @NotBlank(message = "O email é obrigatório")
        @Email(message = "Formato de email inválido")
        String email,

        @Schema(example = "senha123")
        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
        String senha,

        @NotNull(message = "O perfil (role) é obrigatório")
        Role role
) {}
