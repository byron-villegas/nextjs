"use client"

import "@style/NavbarComponent.css"; // Import local styles
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarComponent() {
    const currentPath = usePathname(); // Obtiene la ruta actual

    return (
        <nav className="navbar navbar-dark navbar-expand-lg mb-3" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">NextJS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPath === '/' ? 'active' : ''}`} aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPath === '/users' ? 'active' : ''}`} href="/users">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${currentPath === '/about' ? 'active' : ''}`} href="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}