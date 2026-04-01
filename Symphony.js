// Symphony.js - 427Hz 纯净音频合成
export class JueranSymphony {
    constructor() {
        this.ctx = null;
        this.osc = null;
        this.gain = null;
    }

    init() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.osc = this.ctx.createOscillator();
        this.gain = this.ctx.createGain();
        
        // 频率锁死：427Hz
        this.osc.frequency.setValueAtTime(427, this.ctx.currentTime);
        this.osc.type = 'sine'; // 纯净正弦波
        
        // 增加低通滤波，让声音听起来更“美妙”和“神秘”
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600;

        this.gain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.osc.connect(filter);
        filter.connect(this.gain);
        this.gain.connect(this.ctx.destination);
        
        this.osc.start();
    }

    toggle(active) {
        if (!this.ctx) this.init();
        if (active) {
            if (this.ctx.state === 'suspended') this.ctx.resume();
            this.gain.gain.setTargetAtTime(0.06, this.ctx.currentTime, 1.5);
        } else {
            this.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.8);
        }
    }
}
