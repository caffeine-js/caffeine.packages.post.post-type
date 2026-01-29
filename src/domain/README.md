# PostType
> Domínio relacionado ao tipo de cada Post. Ele é responsável por informar os schemas de cada tipo de conteúdo, permitindo com que seja criado e consultado.
>
> Assim como todo domínio, ele extende de `Entity`.

## 1. Organização
```
#################################################################
# PostType -> Informa o esquema de cada PostContent             #
#                                                               # 
# Post -> Informa uma postagem em sua forma mais simples        #
#                                                               #
# PostContent -> Informa o conteúdo de cada Post e o            #
#                conteúdo das informações adicionais            #
#################################################################
``` 

## 2. Funcionalidades
- Criar
- Consultar
- Atualizar

## 3. Propriedades
### 3.1. Name
> Nome do tipo de Post
### 3.2. Schema
> Esquema do Typebox, que é serializado e armazenado no banco de dados. Ele representará todo o conteúdo adicional a ser apresentado na página.
### 3.3. IsHighlighted
> Definirá se o tipo de Post será exibido no painel lateral do site.

## 4. Limites
> Um PostType não pode ter o Schema alterado.
>
> Um PostType não pode ser removido. Para "remover", é necessário alterar todas as referências desse objeto para um outro objeto, e alterar o `isHighlight` para `false`.
>
> Não pode haver um PostType com nome repetido.