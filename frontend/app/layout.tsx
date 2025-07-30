// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "NPA e-Medical",
  description: "Your system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}