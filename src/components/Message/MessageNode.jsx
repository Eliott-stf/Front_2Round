import React from 'react';
import { formatTimeHHMM } from '@/utils/formateDate';

export default function MessageNode({ isSelf, data }) {
    // On déclare nos constantes 
    const time = formatTimeHHMM(data.createdAt);

    return (
        <div className={`flex w-full ${isSelf ? "justify-end" : "justify-start"} mb-2`}>
            <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${isSelf
                        ? "bg-red text-white rounded-br-md"
                        : "bg-gray-dark text-white rounded-bl-md"
                    }`}
            >
                <p className="text-sm font-body leading-relaxed">{data.text}</p>
                <p
                    className={`text-[10px] mt-1 ${isSelf ? "text-white" : "text-gray"
                        }`}
                >
                    {time}
                </p>
            </div>
        </div>
    );
}