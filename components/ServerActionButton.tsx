import React from "react"
import clsx from "clsx"

interface ButtonProps {
    color: "blue" | "grey";
    children?: React.ReactNode;
    action?: () => unknown
}

export default function ServerActionButton({ color, children, action } : ButtonProps) {
    const colorVariants = {
        blue: "bg-primary-blue hover:bg-secondary-blue"
    };

    const className = `rounded-md px-4 py-2 ${colorVariants[color as keyof typeof colorVariants]}`

    return (
        <form action={action}>
            <button
            className={clsx(className)}
            >
                {children}
            </button>
        </form>
    )
}
