class ThreeModel extends HTMLElement {
    constructor() {
        super();
        this.initScene();
    }

    initScene() {
        // Создание сцены, камеры и рендера
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Соотношение 1:1
        this.camera.position.set(3, 2.3, 3);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.appendChild(this.renderer.domElement);

        // Управление камерой
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 1, 0);
        this.controls.update();

        this.cakeGroup = new THREE.Group();
        this.cakeGroup.position.y += 1;
        this.scene.add(this.cakeGroup);

        this.createCake();
        this.createCandleLevels();
        this.updateSize();
        this.animate();
    }

    updateSize() {
        const timerElement = document.getElementById("timer");
        if (!timerElement) return;

        const rect = timerElement.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height); // Используем максимальную сторону текста

        this.renderer.setSize(size, size);
        this.camera.aspect = 1;
        this.camera.updateProjectionMatrix();
    }

    createCake() {
        const cakeGeometry = new THREE.CylinderGeometry(2, 2, 2, 32);
        const cakeMaterial = new THREE.MeshPhongMaterial({ color: 0xF0A5C2 });
        const cake = new THREE.Mesh(cakeGeometry, cakeMaterial);
        cake.castShadow = true;
        this.cakeGroup.add(cake);

        const baseGeometry = new THREE.CylinderGeometry(2.2, 2.2, 1, 32);
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xF0A5C2 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -0.6;
        base.castShadow = true;
        this.cakeGroup.add(base);

        const light = new THREE.PointLight(0xFFB7E6, 1, 100);
        light.position.set(0, 5, 0);
        light.castShadow = true;
        this.scene.add(light);

        this.scene.add(new THREE.AmbientLight(0x404040));
    }

    createCandleLevels() {
        this.candles = [];
        this.createCandles(12, 1.8, 0.5);
        this.createCandles(8, 1.2, 0.5);
        this.createCandles(4, 0.4, 0.5);
    }

    createCandles(numCandles, radius, candleHeight) {
        for (let i = 0; i < numCandles; i++) {
            const angle = (i / numCandles) * Math.PI * 2;
            const candleGroup = new THREE.Group();
            
            const baseGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 32);
            const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x939B7 });
            const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
            baseMesh.position.y = 1.02;
            candleGroup.add(baseMesh);

            const candleGeometry = new THREE.CylinderGeometry(0.04, 0.04, candleHeight, 32);
            const candleMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
            const candleMesh = new THREE.Mesh(candleGeometry, candleMaterial);
            candleMesh.position.y = candleHeight / 2 + 1;
            candleGroup.add(candleMesh);

            const flameGeometry = new THREE.ConeGeometry(0.03, 0.3, 32);
            const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0DAE });
            const flame = new THREE.Mesh(flameGeometry, flameMaterial);
            flame.visible = false;
            flame.position.y = candleHeight + 1;
            candleGroup.add(flame);

            candleGroup.flame = flame;
            this.candles.push(candleGroup);

            candleGroup.position.x = radius * Math.cos(angle);
            candleGroup.position.z = radius * Math.sin(angle);

            this.cakeGroup.add(candleGroup);
        }
    }

    lightCandles() {
        this.candles.forEach((candle, index) => {
            setTimeout(() => {
                candle.flame.visible = true;
                setInterval(() => {
                    candle.flame.scale.y = 0.8 + Math.random() * 0.4;
                }, 100);
            }, index * 500);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

customElements.define('three-model', ThreeModel);

function lightCandles() {
    document.querySelector("three-model").lightCandles();
}

lightCandles();

// Следим за изменением размера текста и обновляем торт
const observer = new ResizeObserver(() => {
    document.querySelector("three-model").updateSize();
});

const timerElement = document.getElementById("timer");
if (timerElement) observer.observe(timerElement);
