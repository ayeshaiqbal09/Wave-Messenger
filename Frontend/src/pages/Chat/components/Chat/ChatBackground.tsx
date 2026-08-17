function ChatBackground() {
    return (
        <div className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
        ">

            {/* Top-left wave */}
            <div className="
                absolute
                -left-24
                -top-24
                h-72
                w-72
                rounded-full
                bg-blue-100/50
            " />

            {/* Bottom-right wave */}
            <div className="
                absolute
                -bottom-32
                -right-24
                h-96
                w-96
                rounded-full
                bg-cyan-100/40
            " />

            {/* Center subtle circle */}
            <div className="
                absolute
                left-1/2
                top-1/2
                h-80
                w-80
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-indigo-100/30
            " />

        </div>
    );
}

export default ChatBackground;