package br.com.fatec.api.infra;

import br.com.fatec.api.model.Role;
import br.com.fatec.api.model.Usuario;
import br.com.fatec.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@fatec.sp.gov.br";
        String adminPassword = "admin123";

        Usuario admin = usuarioRepository.findByEmail(adminEmail)
                .orElseGet(Usuario::new);

        admin.setNome("Administrador");
        admin.setEmail(adminEmail);
        admin.setRole(Role.ADMIN);

        if (admin.getSenha() == null || !passwordEncoder.matches(adminPassword, admin.getSenha())) {
            admin.setSenha(passwordEncoder.encode(adminPassword));
            usuarioRepository.save(admin);

            System.out.println("#########################################");
            System.out.println("# USUARIO ADMIN CONFIGURADO!            #");
            System.out.println("# Login: admin@fatec.sp.gov.br          #");
            System.out.println("# Senha: admin123                       #");
            System.out.println("#########################################");
        }
    }
}
