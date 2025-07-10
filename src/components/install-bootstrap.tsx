"use client"

import { useEffect } from "react";

export default function InstallBootstrap() {
    useEffect(() => {
        // Importar el JavaScript de Bootstrap dinámicamente
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    
    return <></>; // No renderiza nada, solo se usa para cargar Bootstrap JS
}