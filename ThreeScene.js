// 核心逻辑摘要：粒子吸引子算法
function updateEntanglement(blueCore, greenCore, time) {
    const radius = 220;
    // 蓝色 (愛) 轨迹
    blueCore.position.x = Math.sin(time * 0.7) * radius;
    blueCore.position.y = Math.cos(time * 0.9) * (radius * 0.6);
    blueCore.position.z = Math.sin(time * 0.5) * 100;

    // 绿色 (田野) 轨迹 - 对向纠缠
    greenCore.position.x = Math.sin(time * 0.7 + Math.PI) * radius;
    greenCore.position.y = Math.cos(time * 0.9 + Math.PI) * (radius * 0.6);
    greenCore.position.z = Math.sin(time * 0.5 + Math.PI) * 100;
}

// 空间形态演化函数
function morphSpace(particles, time) {
    const pos = particles.geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 3) {
        // 赋予粒子“家”的重力感与“宇宙”的漂浮感
        const noise = Math.sin(pos[i] * 0.01 + time);
        pos[i + 1] += noise * 0.2; // 纵向微调模拟呼吸
    }
    particles.geometry.attributes.position.needsUpdate = true;
}
