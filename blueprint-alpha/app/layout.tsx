import "./globals.css";

export const metadata = {
  title: "Blueprint",
  description: "1606 Corp. operating command center",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
