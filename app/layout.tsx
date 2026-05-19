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
        url: "/app/favicon.ico",
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
