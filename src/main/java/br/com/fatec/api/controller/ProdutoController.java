package br.com.fatec.api.controller;

import br.com.fatec.api.dto.ProdutoRequestDTO;
import br.com.fatec.api.dto.ProdutoResponseDTO;
import br.com.fatec.api.service.ProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Produtos", description = "Gestão do catálogo de produtos")
@RestController
@RequestMapping("/api/produtos") // Prefixo da rota
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @GetMapping("/categoria/{id}")
    @Operation(summary = "Lista produtos filtrando por uma categoria específica")
    public ResponseEntity<Page<ProdutoResponseDTO>> listarPorCategoria(
            @PathVariable Long id,
            @ParameterObject Pageable paginacao) {

        return ResponseEntity.ok(service.listarPorCategoria(id, paginacao));
    }

    @Operation(summary = "Busca produto por nome", description = "Retorna uma página de produtos cadastrados com ordenação")
    @GetMapping("/busca")
    public ResponseEntity<Page<ProdutoResponseDTO>> buscar(
            @RequestParam(required = false) String nome,
            @PageableDefault(size = 5, sort = "nome") Pageable paginacao) {

        // Se o nome não for enviado, podemos retornar a listagem comum
        if (nome == null || nome.isBlank()) {
            return ResponseEntity.ok(service.listarPaginado(paginacao));
        }

        return ResponseEntity.ok(service.buscarPorNome(nome, paginacao));
    }

    @Operation(summary = "Lista todos os produtos", description = "Retorna uma página de produtos cadastrados com ordenação")
    @GetMapping
    public ResponseEntity<Page<ProdutoResponseDTO>> listar(
    //public List<ProdutoResponseDTO> listar() {
    @ParameterObject @PageableDefault(page = 0, size = 10, sort = "nome", direction = Sort.Direction.ASC)
        Pageable paginacao) {

//        Page<ProdutoResponseDTO> pagina = service.listarPaginado(paginacao);
        //return service.listarTodos();
//        return ResponseEntity.ok(pagina);
        return ResponseEntity.ok(service.listarPaginado(paginacao));
    }
    @Operation(summary = "Busca produto por id", description = "Retorna produto cadastrado {id}")
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> criar(@Valid @RequestBody ProdutoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody ProdutoRequestDTO dto) {
        ProdutoResponseDTO atualizado = service.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}