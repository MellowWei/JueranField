// Engine.js - 427Hz 动力学核心
export class JueranFieldEngine {
    constructor() {
        this.clock = new THREE.Clock();
        this.radius = 220;
        this.frequency = 427;
    }

    // 计算双星纠缠坐标
    getEntanglement(time, mouseX, mouseY) {
        const t = time * 0.8;
        const dynamicRadius = this.radius + Math.sin(t * 0.5) * 60;
        
        return {
            blue: new THREE.Vector3(
                Math.sin(t) * dynamicRadius + mouseX,
                Math.cos(t * 1.1) * (dynamicRadius * 0.6) + mouseY,
                Math.sin(t * 0.5) * 200
            ),
            green: new THREE.Vector3(
                Math.sin(t + Math.PI) * dynamicRadius + mouseX,
                Math.cos(t * 1.1 + Math.PI) * (dynamicRadius * 0.6) + mouseY,
                Math.sin(t * 0.5 + Math.PI) * 200
            )
        };
    }

    // 空间形态 Morphing 逻辑
    updateSpatialParticles(geometry, time, bluePos, greenPos) {
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const dx = positions[i] - bluePos.x;
            const dy = positions[i+1] - bluePos.y;
            const dz = positions[i+2] - bluePos.z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            // 模拟“家”的重力感：粒子在接近核心时产生微小的几何堆砌
            if (dist < 100) {
                positions[i+2] += Math.sin(time + positions[i]) * 0.5;
            }
        }
        geometry.attributes.position.needsUpdate = true;
    }
}
