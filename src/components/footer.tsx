"use client"
import "@style/FooterComponent.css"; // Import local styles

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FooterComponent() {
    const currentPath = usePathname(); // Obtiene la ruta actual
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="container py-5 mt-5">
            <div className="row">
                <div className="col-12 col-md">
                    <Image className="mb-2" src="/images/favicon.ico" alt="Footer Logo" width="24" height="24" />
                    <small className="d-block mb-3 text-white">© {currentYear} - {currentYear + 1}</small>
                </div>
                <div className="col-6 col-md text-white">
                    <h5>MENU</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className={`link-secondary link-white text-decoration-none ${currentPath === '/' ? 'text-white' : ''}`} href="/">HOME</Link></li>
                    </ul>
                    <ul className="list-unstyled text-small">
                        <li><Link className={`link-secondary link-white text-decoration-none ${currentPath === '/users' ? 'text-white' : ''}`} href="/users">USERS</Link></li>
                    </ul>
                    <ul className="list-unstyled text-small">
                        <li><Link className={`link-secondary link-white text-decoration-none ${currentPath === '/about' ? 'text-white' : ''}`} href="/about">ABOUT</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-md text-white">
                    <h5>MENU2</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className={`link-secondary link-white text-decoration-none ${currentPath === '/' ? 'text-white' : ''}`} href="/">HOME</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container-fluid text-center vertical-line">
                <p className="fw-light text-white mt-2">Copyright © {currentYear}. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}