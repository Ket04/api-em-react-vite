package br.com.fatec.api.service;

import br.com.fatec.api.dto.ProdutoRequestDTO;
import br.com.fatec.api.dto.ProdutoResponseDTO;
import br.com.fatec.api.model.Categoria;
import br.com.fatec.api.model.Produto;
import br.com.fatec.api.repository.CategoriaRepository;
import br.com.fatec.api.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Page<ProdutoResponseDTO> buscarPorNome(String nome, Pageable paginacao) {
        return repository.findByNomeContainingIgnoreCase(nome, paginacao)
                .map(ProdutoResponseDTO::fromEntity);
    }

    // Listar: Converte a lista de Entities para DTOs
    public Page<ProdutoResponseDTO> listarPaginado(Pageable paginacao) {
    //public List<ProdutoResponseDTO> listarTodos() {
        return repository.findAll(paginacao)
                //.stream()
                .map(ProdutoResponseDTO::fromEntity);
                //.toList();
    }

    // Buscar por ID: Retorna Optional de DTO
    public Optional<ProdutoResponseDTO> buscarPorId(Long id) {
        return repository.findById(id)
                .map(ProdutoResponseDTO::fromEntity);
        // Se a Entity existir, o .map() a transforma em DTO.
        // Se não existir, retorna um Optional vazio.
    }

    public Page<ProdutoResponseDTO> listarPorCategoria(Long categoriaId, Pageable pageable) {
        return repository.findByCategoriaId(categoriaId, pageable)
                .map(ProdutoResponseDTO::fromEntity);
    }

    // Salvar: Recebe RequestDTO -> Converte para Entity -> Salva -> Retorna ResponseDTO
    public ProdutoResponseDTO salvar(ProdutoRequestDTO dto) {

        Categoria categoria = categoriaRepository.findById(dto.categoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada!"));

        Produto produto = new Produto();
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setCategoria(categoria); // Vincula o objeto completo

        Produto salvo = repository.save(produto);
        return ProdutoResponseDTO.fromEntity(salvo);
    }

    // Atualizar: O ponto onde geralmente ocorre o erro de tipos
    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto) {
        // Busca a Entity no banco
        Produto existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // Transfere os dados do DTO para o Entity
        existente.setNome(dto.nome());
        existente.setPreco(dto.preco());

        // Salva e converte para DTO de saída
        Produto atualizado = repository.save(existente);
        return ProdutoResponseDTO.fromEntity(atualizado);
    }

    public void deletar(Long id) {
        // Valida se o ID existe antes de chamar o deleteById
        if (!repository.existsById(id)) {
            throw new RuntimeException("Não é possível deletar: Produto não encontrado com ID " + id);
        }

        // O método correto para um único ID é deleteById
        repository.deleteById(id);
    }
}
