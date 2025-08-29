import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";

type Crediario = {
  id: string;
  customer_name: string | null;
  is_active: boolean;
};

type Hist = { crediario_id: string; type: string | null; amount: number | null };

export const dynamic = "force-dynamic";

export default async function CrediariosPage() {
  const [{ data: crediarios, error: e1 }, { data: hist, error: e2 }] = await Promise.all([
    supabaseServer
      .from("crediarios")
      .select("id, customer_name, is_active")
      .order("customer_name", { ascending: true }),
    supabaseServer
      .from("crediario_history")
      .select("crediario_id, type, amount"),
  ]);

  if (e1) return <div className="text-red-400">Erro: {e1.message}</div>;
  if (e2) return <div className="text-red-400">Erro: {e2.message}</div>;

  const totals = new Map<string, { consumo: number; pagamento: number }>();
  (hist as Hist[] | null)?.forEach((h) => {
    const cur = totals.get(h.crediario_id) || { consumo: 0, pagamento: 0 };
    const val = Number(h.amount ?? 0);
    if ((h.type || "").toLowerCase() === "payment") cur.pagamento += val;
    else cur.consumo += val;
    totals.set(h.crediario_id, cur);
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Crediários</h2>
      <div className="rounded-lg border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[.06] text-white/80">
            <tr>
              <th className="text-left px-3 py-2">Cliente</th>
              <th className="text-left px-3 py-2">Ativo</th>
              <th className="text-left px-3 py-2">Consumo</th>
              <th className="text-left px-3 py-2">Pagamentos</th>
              <th className="text-left px-3 py-2">Saldo</th>
              <th className="text-left px-3 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {(crediarios as Crediario[] | null || []).map((c) => {
              const t = totals.get(c.id) || { consumo: 0, pagamento: 0 };
              const saldo = t.consumo - t.pagamento;
              return (
                <tr key={c.id} className="odd:bg-white/[.02]">
                  <td className="px-3 py-2">{c.customer_name || c.id}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded border ${c.is_active ? "border-emerald-300/30 text-emerald-300 bg-emerald-500/10" : "border-white/20 text-white/70 bg-white/5"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.is_active ? "bg-emerald-400" : "bg-white/40"}`}></span>
                      {c.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-3 py-2">R$ {t.consumo.toFixed(2)}</td>
                  <td className="px-3 py-2">R$ {t.pagamento.toFixed(2)}</td>
                  <td className={`px-3 py-2 font-medium ${saldo >= 0 ? "text-white" : "text-red-300"}`}>R$ {saldo.toFixed(2)}</td>
                  <td className="px-3 py-2">
                    <Link className="text-xs px-2 py-1 rounded border border-white/15 hover:bg-white/5" href={`/crediarios/${c.id}`}>Ver detalhes</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
