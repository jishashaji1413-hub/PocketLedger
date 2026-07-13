export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100">
      {children}
    </main>
  );
}