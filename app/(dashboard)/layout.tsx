import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">

      <Sidebar />

      <div className="md:ml-64">

        {/* Desktop Navbar */}

        <div className="hidden md:block sticky top-0 z-30">
          <Navbar />
        </div>

        <main className="pt-20 md:pt-6 px-4 md:px-8 pb-8 min-h-screen">
          {children}
        </main>

      </div>

    </div>
  );
}