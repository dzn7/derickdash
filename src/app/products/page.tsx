import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic"; // always server fetch latest

export default async function ProductsPage() {
  const { data: products, error } = await supabaseServer
    .from("products")
    .select("id, name, price, category, code, is_hidden, discount_value, discount_type")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    return <div className="text-red-400">Erro ao carregar produtos: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Produtos</h2>
      <div className="rounded-lg border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[.06] text-white/80">
            <tr>
              <th className="text-left px-3 py-2">Categoria</th>
              <th className="text-left px-3 py-2">Nome</th>
              <th className="text-left px-3 py-2">Código</th>
              <th className="text-left px-3 py-2">Preço</th>
              <th className="text-left px-3 py-2">Desconto</th>
              <th className="text-left px-3 py-2">Visível</th>
            </tr>
          </thead>
          <tbody>
            {((products || []) as any[]).map((p) => (
              <tr key={p.id} className="odd:bg-white/[.02]">
                <td className="px-3 py-2">{p.category}</td>
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2">{p.code || "-"}</td>
                <td className="px-3 py-2">R$ {Number(p.price ?? 0).toFixed(2)}</td>
                <td className="px-3 py-2">
                  {p.discount_type && p.discount_type !== "none"
                    ? `${p.discount_type}: R$ ${Number(p.discount_value ?? 0).toFixed(2)}`
                    : "-"}
                </td>
                <td className="px-3 py-2">{p.is_hidden ? "Não" : "Sim"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
