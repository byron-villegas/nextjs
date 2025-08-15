"use client"

import { Digimon } from "@model/digimon";
import "@style/ListDigimonComponent.css"; // Import local styles
import Utils from "../utils/utils";

export default function ListDigimonComponent({ digimons }: { digimons: Digimon[] }) {
    return (
        <div>
            <h3 className="text-white">Digimons</h3>
            <table className="table table-dark table-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {digimons.map((digimon, index) => (
                        <tr key={index} className="pointer"  onMouseMove={Utils.Events.Table.onRowMouseMove} onMouseLeave={Utils.Events.Table.onRowMouseLeave}>
                            <td>{digimon.name}</td>
                            <td>{digimon.level}</td>
                            <td>
                                <a href={'/digimon/' + digimon.name} className="text-decoration-none text-white">
                                    View
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}