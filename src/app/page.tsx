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

  const { data: recentOrders } = await supabaseServer
    .from("crediario_history")
    .select("id, crediario_id, type, amount, description, date")
    .neq("type", "payment")
    .order("date", { ascending: false })
    .limit(8);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Visão Geral</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/[.05] to-transparent p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60">Produtos</div>
              <div className="text-3xl font-bold mt-1">{prodCount ?? 0}</div>
            </div>
            <div className="h-9 w-9 rounded-md bg-white/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80" aria-hidden>
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/[.05] to-transparent p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60">Complementos</div>
              <div className="text-3xl font-bold mt-1">{compCount ?? 0}</div>
            </div>
            <div className="h-9 w-9 rounded-md bg-white/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80" aria-hidden>
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.51-1 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/[.05] to-transparent p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/60">Crediários</div>
              <div className="text-3xl font-bold mt-1">{credCount ?? 0}</div>
            </div>
            <div className="h-9 w-9 rounded-md bg-white/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80" aria-hidden>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
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

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Pedidos recentes</h3>
          <div className="rounded-lg border border-white/10 divide-y divide-white/10 bg-white/[.03]">
            {(recentOrders as HistoryRow[] | null || []).map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M3 3h18l-1 7H4L3 3z"/><path d="M16 13a4 4 0 1 1-8 0"/>
                    </svg>
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-medium truncate">R$ {Number(o.amount ?? 0).toFixed(2)} • {o.description || "Consumo"}</div>
                    <div className="text-xs text-white/60 truncate">{o.date ? new Date(o.date).toLocaleString() : "-"} · Crediário <Link className="underline" href={`/crediarios/${o.crediario_id}`}>{o.crediario_id}</Link></div>
                  </div>
                </div>
                <Link className="text-xs px-2 py-1 rounded border border-white/15 hover:bg-white/5" href={`/crediarios/${o.crediario_id}`}>Ver</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
