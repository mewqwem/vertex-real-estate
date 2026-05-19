import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: "RealVertexEstate",
  description:
    "Explore the world of premium properties with Real Vertex Estate! Find your dream apartment, house, or commercial space for rent and sale at the best prices.",
  openGraph: {
    title: "Appartments of your dreams",
    description:
      "Discover top real estate offers with Real Vertex Estate. Verified listings, flexible rental options, and secure property investments. Your perfect space starts here!",
    url: "/app/favicon.ico",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 1200,
        height: 630,
        alt: "House",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} ${roboto.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
