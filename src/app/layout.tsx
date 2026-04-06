
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
          <main className="flex-1" tabIndex={-1}>
            {children}
          </main>
      </body>
    </html>
  );
}
