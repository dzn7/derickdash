import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ComplementsPage() {
  const { data: complements, error } = await supabaseServer
    .from("complements")
    .select("id, name, price, category, created_at, updated_at")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) return <div className="text-red-400">Erro: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Complementos</h2>
      <div className="rounded-lg border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[.06] text-white/80">
            <tr>
              <th className="text-left px-3 py-2">Categoria</th>
              <th className="text-left px-3 py-2">Nome</th>
              <th className="text-left px-3 py-2">Preço</th>
              <th className="text-left px-3 py-2">Criado</th>
              <th className="text-left px-3 py-2">Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {(complements || []).map((c) => (
              <tr key={c.id} className="odd:bg-white/[.02]">
                <td className="px-3 py-2">{c.category}</td>
                <td className="px-3 py-2">{c.name}</td>
                <td className="px-3 py-2">R$ {Number(c.price ?? 0).toFixed(2)}</td>
                <td className="px-3 py-2">{c.created_at ? new Date(c.created_at).toLocaleString() : "-"}</td>
                <td className="px-3 py-2">{c.updated_at ? new Date(c.updated_at).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
