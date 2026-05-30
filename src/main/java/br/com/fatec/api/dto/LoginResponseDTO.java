package br.com.fatec.api.dto;

import br.com.fatec.api.model.Role;
import br.com.fatec.api.model.Usuario;

public record LoginResponseDTO(
        String token,
        Long id,
        String nome,
        String email,
        Role role
) {
    public static LoginResponseDTO fromEntity(Usuario usuario, String token) {
        return new LoginResponseDTO(
                token,
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole()
        );
    }
}
