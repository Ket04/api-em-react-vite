package br.com.fatec.api.repository;

import br.com.fatec.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Utilizado para validar se o e-mail já está em uso no cadastro
    boolean existsByEmail(String email);

    // Futuramente será essencial para o Spring Security localizar o usuário no login
    Optional<Usuario> findByEmail(String email);
}