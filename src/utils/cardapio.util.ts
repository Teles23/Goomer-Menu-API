import { formatarMoeda } from "./currency.util.js";

export default function formatarCardapio(menu: any[]): any[] {
  return menu.map((categoria) => ({
    ...categoria,
    produtos: categoria.produtos.map(
      (produto: {
        preco: number;
        promocaoAtiva: { precoPromocional: number };
      }) => ({
        ...produto,
        preco: formatarMoeda(produto.preco),
        promocaoAtiva: produto.promocaoAtiva
          ? {
              ...produto.promocaoAtiva,
              precoPromocional: formatarMoeda(
                produto.promocaoAtiva.precoPromocional
              ),
            }
          : null,
      })
    ),
  }));
}
