package br.com.fatec.api.dto;

import br.com.fatec.api.model.Role;
import br.com.fatec.api.model.Usuario;

public record UsuarioResponseDTO(
        Long id,
        String nome,
        String email,
        Role role
) {
    // Método utilitário para converter a Entity para DTO
    public static UsuarioResponseDTO fromEntity(Usuario usuario) {
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole()
        );
    }
}
