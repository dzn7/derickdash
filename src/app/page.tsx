import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";
type HistoryRow = {
  id: string;
  crediario_id: string;
  type: string | null;
  amount: number | null;
  description: string | null;
  date: string | null;
};

export default async function Home() {
  const [{ count: prodCount }, { count: compCount }, { count: credCount }] = await Promise.all([
    supabaseServer.from("products").select("id", { count: "exact", head: true }),
    supabaseServer.from("complements").select("id", { count: "exact", head: true }),
    supabaseServer.from("crediarios").select("id", { count: "exact", head: true }),
  ]);

  const { data: recentHistory } = await supabaseServer
    .from("crediario_history")
    .select("id, crediario_id, type, amount, description, date")
    .order("date", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Visão Geral</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-white/10 bg-white/[.03] p-4">
          <div className="text-sm text-white/60">Produtos</div>
          <div className="text-3xl font-bold mt-1">{prodCount ?? 0}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[.03] p-4">
          <div className="text-sm text-white/60">Complementos</div>
          <div className="text-3xl font-bold mt-1">{compCount ?? 0}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[.03] p-4">
          <div className="text-sm text-white/60">Crediários</div>
          <div className="text-3xl font-bold mt-1">{credCount ?? 0}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Movimentações recentes (Crediário)</h3>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[.06] text-white/80">
              <tr>
                <th className="text-left px-3 py-2">Data</th>
                <th className="text-left px-3 py-2">Crediário</th>
                <th className="text-left px-3 py-2">Tipo</th>
                <th className="text-left px-3 py-2">Valor</th>
                <th className="text-left px-3 py-2">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {(recentHistory as HistoryRow[] | null || []).map((h) => (
                <tr key={h.id} className="odd:bg-white/[.02]">
                  <td className="px-3 py-2">{h.date ? new Date(h.date).toLocaleString() : "-"}</td>
                  <td className="px-3 py-2"><Link className="underline" href={`/crediarios/${h.crediario_id}`}>{h.crediario_id}</Link></td>
                  <td className="px-3 py-2">{h.type}</td>
                  <td className="px-3 py-2">R$ {Number(h.amount ?? 0).toFixed(2)}</td>
                  <td className="px-3 py-2">{h.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
