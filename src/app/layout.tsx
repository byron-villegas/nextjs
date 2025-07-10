import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "@style/globals.css";

import Head from "next/head";

import InstallBootstrap from "@component/install-bootstrap";
import NavbarComponent from "@component/navbar";
import FooterComponent from "@component/footer";

export const metadata = {
  title: "NextJS",
  description: "NextJS Example",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <InstallBootstrap /> {/* Include the component to install Bootstrap JS */}
        <NavbarComponent />
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
