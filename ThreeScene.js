// Kernel.js - 核心引力纠缠算法
export class EntanglementKernel {
    constructor() {
        this.time = 0;
        this.radius = 200;
        this.chaos = 0.05; // 模拟梦境的不稳定感
    }

    // 计算 愛 (Blue) 与 田野 (Green) 的实时坐标
    update() {
        this.time += 0.015;
        
        // 蓝色点：愛 的动态路径
        const bluePos = {
            x: Math.sin(this.time) * this.radius + Math.cos(this.time * 0.5) * 50,
            y: Math.cos(this.time * 1.2) * (this.radius * 0.5),
            z: Math.sin(this.time * 0.8) * 120
        };

        // 绿色点：田野 的动态路径 - 物理障碍消除（互相穿透）
        const greenPos = {
            x: Math.sin(this.time + Math.PI) * this.radius + Math.cos(this.time * 0.5) * 50,
            y: Math.cos(this.time * 1.2 + Math.PI) * (this.radius * 0.5),
            z: Math.sin(this.time * 0.8 + Math.PI) * 120
        };

        return { bluePos, greenPos };
    }
}
