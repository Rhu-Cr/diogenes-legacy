import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  full_name: string;
  birth_date: string | null;
  age: number | null;
  email: string;
  cpf: string;
  phone: string;
  cep: string;
  city: string;
  created_at: string;
}

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    const run = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error || !data) {
        setIsAdmin(false);
        setChecking(false);
        toast.error("Acesso restrito à área administrativa.");
        navigate("/");
        return;
      }
      setIsAdmin(true);
      const { data: rows, error: sErr } = await supabase
        .from("students")
        .select("id, full_name, birth_date, age, email, cpf, phone, cep, city, created_at")
        .order("created_at", { ascending: false });
      if (sErr) {
        toast.error("Erro ao carregar alunos.");
      } else {
        setStudents((rows ?? []) as Student[]);
      }
      setChecking(false);
    };
    run();
  }, [user, navigate]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Verificando permissões...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.full_name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.cpf.includes(q) ||
      s.phone.includes(q) ||
      s.cep.includes(q) ||
      (s.city ?? "").toLowerCase().includes(q)
    );
  });

  const formatCpf = (cpf: string) =>
    cpf.length === 11 ? `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}` : cpf;

  const formatPhone = (p: string) => {
    if (p.length === 11) return `(${p.slice(0, 2)}) ${p.slice(2, 7)}-${p.slice(7)}`;
    if (p.length === 10) return `(${p.slice(0, 2)}) ${p.slice(2, 6)}-${p.slice(6)}`;
    return p;
  };

  const formatCep = (cep: string) =>
    cep.length === 8 ? `${cep.slice(0, 2)}.${cep.slice(2, 5)}-${cep.slice(5)}` : cep;

  const formatBirth = (d: string | null) => {
    if (!d) return "—";
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  };

  const calcAge = (d: string | null, fallback: number | null) => {
    if (!d) return fallback ?? "—";
    const b = new Date(d);
    const t = new Date();
    let age = t.getFullYear() - b.getFullYear();
    const mm = t.getMonth() - b.getMonth();
    if (mm < 0 || (mm === 0 && t.getDate() < b.getDate())) age--;
    return age;
  };

  const exportCsv = () => {
    const header = ["Nome", "Data de nascimento", "Idade", "E-mail", "CPF", "Telefone", "CEP", "Cidade", "Cadastro"];
    const rows = filtered.map((s) => [
      s.full_name,
      formatBirth(s.birth_date),
      String(calcAge(s.birth_date, s.age)),
      s.email,
      formatCpf(s.cpf),
      formatPhone(s.phone),
      formatCep(s.cep),
      s.city ?? "",
      new Date(s.created_at).toLocaleString("pt-BR"),
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alunos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <BackButton label="Voltar ao Início" to="/" />
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-accent/10">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">Área Administrativa</h1>
              <p className="text-muted-foreground">Alunos cadastrados na plataforma</p>
            </div>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <Users className="h-5 w-5 text-accent" />
                Alunos ({filtered.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <Input
                  placeholder="Buscar por nome, e-mail, CPF, telefone, CEP ou cidade..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-md"
                />
                <button
                  onClick={exportCsv}
                  className="text-sm px-3 py-2 rounded-md border border-border hover:bg-muted transition-colors"
                >
                  Exportar CSV
                </button>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome completo</TableHead>
                      <TableHead>Nascimento</TableHead>
                      <TableHead>Idade</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>CEP</TableHead>
                      <TableHead>Cidade</TableHead>
                      <TableHead>Cadastro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                          Nenhum aluno encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">{s.full_name}</TableCell>
                          <TableCell>{formatBirth(s.birth_date)}</TableCell>
                          <TableCell>{calcAge(s.birth_date, s.age)}</TableCell>
                          <TableCell>{s.email}</TableCell>
                          <TableCell className="font-mono text-sm">{formatCpf(s.cpf)}</TableCell>
                          <TableCell className="font-mono text-sm">{formatPhone(s.phone)}</TableCell>
                          <TableCell className="font-mono text-sm">{formatCep(s.cep)}</TableCell>
                          <TableCell>{s.city || "—"}</TableCell>
                          <TableCell>{new Date(s.created_at).toLocaleDateString("pt-BR")}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
