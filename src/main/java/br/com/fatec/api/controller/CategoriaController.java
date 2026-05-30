package br.com.fatec.api.controller;

import br.com.fatec.api.dto.CategoriaRequestDTO;
import br.com.fatec.api.dto.CategoriaResponseDTO;
import br.com.fatec.api.service.CategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categorias")
@Tag(name = "Categorias", description = "Endpoints para gerenciamento de categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService service;

    @GetMapping
    @Operation(summary = "Lista categorias com paginação")
    public ResponseEntity<Page<CategoriaResponseDTO>> listar(
            @RequestParam(required = false) String nome,
            @ParameterObject Pageable pageable) {

        if (nome != null) {
            return ResponseEntity.ok(service.buscarPorNome(nome, pageable));
        }
        return ResponseEntity.ok(service.listar(pageable));
    }

    @PostMapping
    @Operation(summary = "Cadastra uma nova categoria")
    public ResponseEntity<CategoriaResponseDTO> criar(@RequestBody @Valid CategoriaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(dto));
    }

}