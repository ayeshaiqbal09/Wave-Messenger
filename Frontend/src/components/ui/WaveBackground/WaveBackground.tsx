
function WaveBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">

            <div className="wave-one absolute
    -top-24
    -left-24
    h-[34rem]
    w-[34rem]
    rounded-full
    bg-blue-300/30
    "></div>

            <div className="wave-two
              absolute
    bottom-0
    right-0
    h-[30rem]
    w-[30rem]
    rounded-full
    bg-cyan-300/25
    "></div>
            
            <div
    className="wave-three
        absolute
    top-1/2
    left-1/2
    h-[24rem]
    w-[24rem]
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    bg-indigo-300/20
    
    "
></div>

  <div
    className=" wave-four
        absolute
        -bottom-20
        -left-24
        h-[26rem]
        w-[26rem]
        rounded-full
        bg-sky-400/15
        
    
    "
></div>

        </div>
            );
}
export default WaveBackground;