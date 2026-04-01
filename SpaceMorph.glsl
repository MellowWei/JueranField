// SpaceMorph.vertex.glsl
varying vec3 vColor;
uniform float uTime;
uniform vec3 uBlueCore;
uniform vec3 uGreenCore;

void main() {
    vec3 pos = position;

    // 1. 模拟室内家具的几何牵引
    float distToBlue = distance(pos, uBlueCore);
    float distToGreen = distance(pos, uGreenCore);
    
    // 2. 空间坍缩：当两个点靠近时，粒子向中心聚拢形成“接触感”
    float pull = 1.0 / (distToBlue * 0.05 + 1.0) + 1.0 / (distToGreen * 0.05 + 1.0);
    pos += normalize(uBlueCore - pos) * pull * 15.0;

    // 3. 宇宙脉动：粒子随 427Hz 节律产生呼吸
    pos.y += sin(uTime * 0.5 + pos.x * 0.01) * 10.0;

    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0 * (800.0 / -mvPosition.z); // 随深度改变粒子大小
    gl_Position = projectionMatrix * mvPosition;
}
