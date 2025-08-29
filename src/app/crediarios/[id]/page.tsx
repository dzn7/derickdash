import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function CrediarioDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [{ data: cred, error: e1 }, { data: hist, error: e2 }] = await Promise.all([
    supabaseServer
      .from("crediarios")
      .select("id, customer_name, is_active, created_at, updated_at")
      .eq("id", id)
      .maybeSingle(),
    supabaseServer
      .from("crediario_history")
      .select("id, type, amount, description, items_consumed, date")
      .eq("crediario_id", id)
      .order("date", { ascending: false }),
  ]);

  if (e1) return <div className="text-red-400">Erro: {e1.message}</div>;
  if (!cred) return <div>Crediário não encontrado.</div>;
  if (e2) return <div className="text-red-400">Erro: {e2.message}</div>;

  const consumo = (hist || []).filter(h => (h.type || "").toLowerCase() !== "payment").reduce((a, b) => a + Number(b.amount || 0), 0);
  const pagamentos = (hist || []).filter(h => (h.type || "").toLowerCase() === "payment").reduce((a, b) => a + Number(b.amount || 0), 0);
  const saldo = consumo - pagamentos;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Crediário de {cred.customer_name || cred.id}</h2>
          <p className="text-white/60 text-sm">ID: {cred.id}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-white/60">Saldo</div>
          <div className="text-3xl font-bold">R$ {saldo.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-white/10 bg-white/[.03] p-4">
          <div className="text-sm text-white/60">Consumo</div>
          <div className="text-2xl font-semibold mt-1">R$ {consumo.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[.03] p-4">
          <div className="text-sm text-white/60">Pagamentos</div>
          <div className="text-2xl font-semibold mt-1">R$ {pagamentos.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[.03] p-4">
          <div className="text-sm text-white/60">Status</div>
          <div className="text-2xl font-semibold mt-1">{cred.is_active ? "Ativo" : "Inativo"}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Histórico</h3>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[.06] text-white/80">
              <tr>
                <th className="text-left px-3 py-2">Data</th>
                <th className="text-left px-3 py-2">Tipo</th>
                <th className="text-left px-3 py-2">Valor</th>
                <th className="text-left px-3 py-2">Descrição</th>
                <th className="text-left px-3 py-2">Itens</th>
              </tr>
            </thead>
            <tbody>
              {(hist || []).map((h) => (
                <tr key={h.id} className="odd:bg-white/[.02]">
                  <td className="px-3 py-2">{h.date ? new Date(h.date as any).toLocaleString() : "-"}</td>
                  <td className="px-3 py-2">{h.type}</td>
                  <td className="px-3 py-2">R$ {Number(h.amount ?? 0).toFixed(2)}</td>
                  <td className="px-3 py-2">{h.description || "-"}</td>
                  <td className="px-3 py-2 whitespace-pre-wrap">{h.items_consumed || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
