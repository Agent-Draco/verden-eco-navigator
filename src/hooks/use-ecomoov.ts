import { getDistanceFromLatLonInKm } from "@/lib/distance";
import { useState, useEffect } from "react";

const mockUsers = [
    { name: "Sarah K.", avatar: "SK" },
    { name: "Alex M.", avatar: "AM" },
    { name: "Priya D.", avatar: "PD" },
    { name: "Jordan L.", avatar: "JL" },
];

const generateRandomPoint = (center: [number, number], radius: number) => {
    const y0 = center[0];
    const x0 = center[1];
    const rd = radius / 111300; // about 111300 meters in one degree

    const u = Math.random();
    const v = Math.random();

    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    return [y + y0, x + x0];
};


const useEcoMoov = (userRoute) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (!userRoute) return;

        const userStart = userRoute.geometry.coordinates[0];
        const userEnd = userRoute.geometry.coordinates[userRoute.geometry.coordinates.length - 1];

        const newGroups = mockUsers.map(user => {
            const startPoint = generateRandomPoint(userStart, 1000);
            const endPoint = generateRandomPoint(userEnd, 1000);

            const startDistance = getDistanceFromLatLonInKm(userStart[1], userStart[0], startPoint[1], startPoint[0]);
            const endDistance = getDistanceFromLatLonInKm(userEnd[1], userEnd[0], endPoint[1], endPoint[0]);

            const match = Math.max(0, 100 - (startDistance + endDistance) * 10);

            return {
                ...user,
                match: Math.round(match),
                route: `Near you`,
                time: `${Math.floor(Math.random() * 60)} min away`,
                members: Math.floor(Math.random() * 5) + 1
            };
        });

        setGroups(newGroups.sort((a, b) => b.match - a.match));
    }, [userRoute]);

    return groups;
};

export default useEcoMoov;
