import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- Setup ---
        const scene = new THREE.Scene();
        const fogColor = new THREE.Color(0x4a4e69);
        scene.fog = new THREE.FogExp2(fogColor, 0.005);

        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 20);
        camera.lookAt(0, 2, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;

        // Append to container
        containerRef.current.appendChild(renderer.domElement);

        // --- Objects ---

        // 1. Water
        const waterGeometry = new THREE.PlaneGeometry(300, 300, 128, 128);
        const waterMaterial = new THREE.MeshStandardMaterial({
            color: 0x006994,
            roughness: 0.1,
            metalness: 0.6,
            flatShading: false,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.receiveShadow = true;
        scene.add(water);

        // 2. Sand
        const sandGeometry = new THREE.PlaneGeometry(300, 50, 64, 64);
        const sandMaterial = new THREE.MeshStandardMaterial({
            color: 0xE6C288,
            roughness: 0.8,
            metalness: 0.1
        });
        const sand = new THREE.Mesh(sandGeometry, sandMaterial);
        sand.rotation.x = -Math.PI / 2;
        sand.position.z = 80;
        sand.position.y = -0.5;
        sand.rotation.z = 0.05;

        // Add noise to sand
        const sandPos = sand.geometry.attributes.position;
        for (let i = 0; i < sandPos.count; i++) {
            const z = sandPos.getZ(i);
            sandPos.setZ(i, z + Math.random() * 0.5);
        }
        sand.geometry.computeVertexNormals();
        scene.add(sand);

        // 3. Sun
        const sunGeometry = new THREE.SphereGeometry(15, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // --- Lights ---
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffaa33, 1.5);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        scene.add(sunLight);

        const fillLight = new THREE.PointLight(0x0044ff, 0.5, 100);
        fillLight.position.set(0, 10, 10);
        scene.add(fillLight);

        // --- Animation Logic ---
        let time = 0;
        const waterVertices = waterGeometry.attributes.position;
        const initialWaterZ = [];

        for (let i = 0; i < waterVertices.count; i++) {
            initialWaterZ.push(waterVertices.getZ(i));
        }

        const updateSunPosition = (value) => {
            const sliderVal = parseFloat(value);
            const elevation = (sliderVal / 100) * 30 - 5;
            const xPos = 0;
            const zPos = -100;
            const yPos = elevation;

            sun.position.set(xPos, yPos, zPos);
            sunLight.position.set(xPos, yPos, zPos - 20);

            const t = Math.max(0, Math.min(1, (sliderVal) / 100));

            const colorDay = new THREE.Color(0x87CEEB);
            const colorSunset = new THREE.Color(0xFD5E53);
            const colorNight = new THREE.Color(0x0f172a);

            let skyColor;
            if (t > 0.5) {
                skyColor = colorSunset.clone().lerp(colorDay, (t - 0.5) * 2);
                sunMaterial.color.setHex(0xffaa33);
                sunLight.color.setHex(0xffaa33);
                sunLight.intensity = 1.5;
            } else {
                skyColor = colorNight.clone().lerp(colorSunset, t * 2);
                sunMaterial.color.setHex(0xff4500);
                sunLight.color.setHex(0xff4500);
                sunLight.intensity = 0.5 + t;
            }

            scene.background = skyColor;
            scene.fog.color.copy(skyColor);

            waterMaterial.color.lerpColors(new THREE.Color(0x001133), new THREE.Color(0x006994), t);
        };

        // Initialize Sun
        updateSunPosition(40);

        // Scroll Listener
        const handleScroll = () => {
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = Math.max(0, Math.min(1, scrollTop / docHeight));

            // Map scroll to sunset cycle (Starts at 40, goes to 0/Night)
            const val = 40 - (scrollPercent * 40);
            updateSunPosition(val);
        };
        window.addEventListener('scroll', handleScroll);

        // Render Loop
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            time += 0.005;

            // Animate Water
            for (let i = 0; i < waterVertices.count; i++) {
                const x = waterVertices.getX(i);
                const y = waterVertices.getY(i);

                const wave1 = Math.sin(x * 0.1 + time) * 1.5;
                const wave2 = Math.cos(y * 0.1 + time * 0.8) * 1.5;
                const wave3 = Math.sin((x + y) * 0.05 + time * 0.5) * 1.0;

                waterVertices.setZ(i, initialWaterZ[i] + wave1 + wave2 + wave3);
            }
            waterVertices.needsUpdate = true;
            waterGeometry.computeVertexNormals();

            // Camera Sway
            camera.position.x = Math.sin(time * 0.1) * 1;
            camera.lookAt(0, 2, 0);

            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            // Dispose geometries/materials ideally
            waterGeometry.dispose();
            waterMaterial.dispose();
            sandGeometry.dispose();
            sandMaterial.dispose();
            sunGeometry.dispose();
            sunMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
    );
};

export default ThreeBackground;
