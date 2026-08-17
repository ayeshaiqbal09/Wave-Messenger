let audioContext: AudioContext | null = null;

export function playNotificationSound() {

    if (!audioContext) {
        audioContext = new AudioContext();
    }

    const context = audioContext;

    if (context.state === "suspended") {
        context.resume();
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        880,
        context.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        660,
        context.currentTime + 0.12
    );

    gain.gain.setValueAtTime(
        0.0001,
        context.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.18,
        context.currentTime + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.18
    );

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();

    oscillator.stop(
        context.currentTime + 0.18
    );
}