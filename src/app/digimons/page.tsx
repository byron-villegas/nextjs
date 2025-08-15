"use client"

import ListDigimonComponent from "@component/list-digimon";
import { Digimon } from "@model/digimon";
import { findAllDigimons } from "@service/digimon-service";
import { useEffect, useState } from "react";

export default function Digimons() {
    const [digimons, setDigimons] = useState<Digimon[]>([]);

    // Cargar usuarios al montar
    useEffect(() => {
        findAllDigimons().then(data => setDigimons(data));
    }, []);


    return (
        <ListDigimonComponent digimons={digimons} />
    )
}