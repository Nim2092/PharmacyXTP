"use client";
import React, { useState } from 'react';

const ToggleIconButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-blue-500 rounded"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={isOpen ? "m19.5 8.25-7.5 7.5-7.5-7.5" : "m8.25 4.5 7.5 7.5-7.5 7.5"}
                />
            </svg>
        </button>
    );
};

export default ToggleIconButton;