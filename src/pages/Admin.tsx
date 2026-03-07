import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AdminLogin from "@/pages/AdminLogin";
import { Diamond, LogOut, Settings, FileText, Users, Building2, LayoutDashboard, Loader2 } from "lucide-react";
import AdminHeaderEditor from "@/pages/admin/AdminHeaderEditor";
import AdminHeroEditor from "@/pages/admin/AdminHeroEditor";
import AdminFounderEditor from "@/pages/admin/AdminFounderEditor";
import AdminCompaniesEditor from "@/pages/admin/AdminCompaniesEditor";
import AdminFooterEditor from "@/pages/admin/AdminFooterEditor";

const sections = [
  { id: "header", label: "Header", icon: LayoutDashboard },
  { id: "hero", label: "Hero", icon: FileText },
  { id: "founder", label: "Fundador", icon: Users },
  { id: "companies", label: "Empresas", icon: Building2 },
  { id: "footer", label: "Footer", icon: Settings },
];

const Admin = () => {
  const { user, loading, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("header");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <AdminLogin />;

  const renderEditor = () => {
    switch (activeSection) {
      case "header": return <AdminHeaderEditor />;
      case "hero": return <AdminHeroEditor />;
      case "founder": return <AdminFounderEditor />;
      case "companies": return <AdminCompaniesEditor />;
      case "footer": return <AdminFooterEditor />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Diamond className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground tracking-tight">LS CMS</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === s.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 truncate">{user.email}</p>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl">
          {renderEditor()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
