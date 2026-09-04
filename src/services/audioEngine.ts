class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingPiano: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlayingPiano) {
      this.stopPianoMusic();
    } else if (!this.isMuted && !this.isPlayingPiano) {
      this.startPianoMusic();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft Button Click
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Wooden Door Creak Sound
  public playDoorOpen() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(140, this.ctx.currentTime + 0.8);
    osc.frequency.linearRampToValueAtTime(70, this.ctx.currentTime + 1.4);

    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);

    // Complementary low thud
    const thud = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(60, this.ctx.currentTime);
    thud.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.6);
    thudGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    thudGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start();
    thud.stop(this.ctx.currentTime + 0.6);
  }

  // Page Turn Paper Sound
  public playPageTurn() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Soft Rain Sound Effect
  private rainNode: AudioNode | null = null;
  public startRainSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || this.rainNode) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();
    this.rainNode = whiteNoise;
  }

  public stopRainSound() {
    if (this.rainNode) {
      try {
        (this.rainNode as AudioBufferSourceNode).stop();
      } catch (e) {
        // ignore
      }
      this.rainNode = null;
    }
  }

  // Ribbon Untying & Gift Box Soft Swoosh
  public playRibbonUntie() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, this.ctx.currentTime + 0.3); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, this.ctx.currentTime + 0.6); // G5

    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }

  // Ambient Piano Music (Harmonic Warm Chords Sequence)
  public startPianoMusic() {
    if (this.isMuted || this.isPlayingPiano) return;
    this.initContext();
    if (!this.ctx) return;

    this.isPlayingPiano = true;
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // C maj7
      [220.00, 261.63, 329.63, 392.00], // A min7
      [174.61, 220.00, 261.63, 329.63], // F maj7
      [196.00, 246.94, 293.66, 392.00]  // G maj
    ];

    let chordIdx = 0;

    const playChordLoop = () => {
      if (!this.isPlayingPiano || !this.ctx || this.isMuted) return;
      const currentChord = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;

      currentChord.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.15);

        const startTime = this.ctx.currentTime + i * 0.15;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.03, startTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0005, startTime + 3.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 3.3);
      });

      if (this.isPlayingPiano) {
        setTimeout(playChordLoop, 3500);
      }
    };

    playChordLoop();
  }

  public stopPianoMusic() {
    this.isPlayingPiano = false;
  }
}

export const audioEngine = new AudioEngine();
