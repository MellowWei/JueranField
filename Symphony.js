class QualiaAudio {
    constructor() {
        this.ctx = null;
        this.osc = null;
        this.gain = null;
        this.frequency = 427; // 锁定 427Hz
    }

    init() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.osc = this.ctx.createOscillator();
        this.gain = this.ctx.createGain();
        
        this.osc.type = 'sine';
        this.osc.frequency.setValueAtTime(this.frequency, this.ctx.currentTime);
        
        // 添加泛音列以增加“美妙感”
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        this.gain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.osc.connect(filter);
        filter.connect(this.gain);
        this.gain.connect(this.ctx.destination);
        
        this.osc.start();
    }

    startResonance() {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        // 柔和淡入
        this.gain.gain.setTargetAtTime(0.06, this.ctx.currentTime, 1.5);
    }

    stopResonance() {
        if (this.gain) {
            // 柔和淡出
            this.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 1.0);
        }
    }
}

export const audioEngine = new QualiaAudio();
