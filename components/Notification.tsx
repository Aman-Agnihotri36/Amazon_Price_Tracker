"use client";

import { useEffect, useState } from "react";

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [isload, setisload] = useState(false);

    useEffect(() => {
        async function fetchNotifications() {
            setisload(true);
            const res = await fetch("/api/notification");
            console.log('data', res)
            const data = await res.json();
            setNotifications(data);
            setisload(false);
        }
        fetchNotifications();


    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
            {isload ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <p className="text-gray-500">No notifications</p>
                    ) : (
                        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                        notifications.map((n: any) => (
                            <div
                                key={n.id}
                                className="p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <p className="text-gray-700">{n.message}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(n.time).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
