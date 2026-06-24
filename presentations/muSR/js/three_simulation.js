// 3D Crystal Lattice Visualizer using Three.js and WebGL.
// Exposes state and functions globally for app.js integration.

const threeState = {
    renderer: null,
    scene: null,
    camera: null,
    controls: null,
    animationId: null,
    observer: null,
    initTimer: null
};

// Safe disposal of WebGL context to prevent resource leaks
function cleanupThreeJS() {
    if (threeState.animationId) {
        cancelAnimationFrame(threeState.animationId);
        threeState.animationId = null;
    }
    if (threeState.observer) {
        threeState.observer.disconnect();
        threeState.observer = null;
    }
    if (threeState.renderer) {
        if (threeState.dblClickHandler) {
            threeState.renderer.domElement.removeEventListener('dblclick', threeState.dblClickHandler);
            threeState.dblClickHandler = null;
        }
        threeState.renderer.dispose();
        threeState.renderer.forceContextLoss();
        const domElement = threeState.renderer.domElement;
        if (domElement && domElement.parentNode) {
            domElement.parentNode.removeChild(domElement);
        }
        threeState.renderer = null;
    }
    if (threeState.scene) {
        threeState.scene.clear();
        threeState.scene = null;
    }
    threeState.camera = null;
    threeState.controls = null;
}

function initThreeJS() {
    cleanupThreeJS(); 

    const container = document.getElementById('three-container');
    if (!container) return;
    
    // Read state from the global app variables
    const data = steps.find(s => s.id === activeId);

    const existingCanvases = container.getElementsByTagName('canvas');
    while(existingCanvases.length > 0) {
        existingCanvases[0].parentNode.removeChild(existingCanvases[0]);
    }
    
    container.innerHTML = ''; 

    const scene = new THREE.Scene();
    threeState.scene = scene;
    scene.background = new THREE.Color('#05070c'); 
    
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    threeState.camera = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    threeState.renderer = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '1';
    
    container.appendChild(renderer.domElement);

    const a = 4.689;
    const centerOffset = a; 
    
    // The base ideal stopping site in unit cell coordinates
    let muonPos = new THREE.Vector3(1.5 * a, a, a);
    const bid = (typeof activeBranch !== 'undefined') ? activeBranch : 'edge_jitter1';
    const isBodyCenter = bid.includes('body');
    
    if (isBodyCenter) {
        muonPos.set(1.5 * a, 1.5 * a, 1.5 * a);
    } else {
        muonPos.set(1.5 * a, a, a);
    }

    let dx = 0;
    let dy = 0;
    let dz = 0;

    let u_coords = null;
    let v_coords = null;
    let w_coords = null;
    let voidU = isBodyCenter ? 0.25 : 0.0;
    let voidV = isBodyCenter ? 0.25 : 0.0;
    let voidW = isBodyCenter ? 0.25 : 0.25;

    if (typeof DYNAMIC_BRANCH_RESULTS !== 'undefined' && DYNAMIC_BRANCH_RESULTS[bid]) {
        const res = DYNAMIC_BRANCH_RESULTS[bid];
        u_coords = parseFloat(res.muon_frac[0]);
        v_coords = parseFloat(res.muon_frac[1]);
        w_coords = parseFloat(res.muon_frac[2]);
        
        voidU = parseFloat(res.void_frac[0]) / 2.0;
        voidV = parseFloat(res.void_frac[1]) / 2.0;
        voidW = parseFloat(res.void_frac[2]) / 2.0;
    } else if (typeof DYNAMIC_MUON_FRAC !== 'undefined' && DYNAMIC_MUON_FRAC !== null && 
        parseFloat(DYNAMIC_MUON_FRAC[0]) !== 0.0) {
        u_coords = parseFloat(DYNAMIC_MUON_FRAC[0]);
        v_coords = parseFloat(DYNAMIC_MUON_FRAC[1]);
        w_coords = parseFloat(DYNAMIC_MUON_FRAC[2]);
        
        if (typeof DYNAMIC_VOID_FRAC !== 'undefined' && DYNAMIC_VOID_FRAC !== null) {
            voidU = parseFloat(DYNAMIC_VOID_FRAC[0]);
            voidV = parseFloat(DYNAMIC_VOID_FRAC[1]);
            voidW = parseFloat(DYNAMIC_VOID_FRAC[2]);
        }
    }

    if (u_coords !== null && u_coords !== 0.0) {
        const du = u_coords - voidU;
        const dv = v_coords - voidV;
        const dw = w_coords - voidW;
        
        // Convert to Cartesian displacement (supercell is 2a) and map
        // from calculation coordinates to visualizer coordinates
        if (isBodyCenter) {
            // For body center, map isotropic displacement directly
            dx = du * 2 * a;
            dy = dv * 2 * a;
            dz = dw * 2 * a;
        } else {
            dx = dw * 2 * a;
            dy = du * 2 * a;
            dz = dv * 2 * a;
        }
        
        // Apply displacement to our visualization site
        muonPos.x += dx;
        muonPos.y += dy;
        muonPos.z += dz;
    } else {
        // Fallback to initial jittered position if not relaxed/loaded yet
        if (bid.includes('jitter')) {
            const bConfig = (typeof DYNAMIC_BRANCHES !== 'undefined') ? DYNAMIC_BRANCHES.find(x => x.id === bid) : null;
            const jitter = bConfig ? bConfig.jitter_ang : (isBodyCenter ? [0.03, -0.02, 0.04] : [0.05, 0.02, -0.03]);
            dx = jitter[0];
            dy = jitter[1];
            dz = jitter[2];
            muonPos.x += dx;
            muonPos.y += dy;
            muonPos.z += dz;
        }
    }

    camera.position.set(muonPos.x + 8, muonPos.y + 6, muonPos.z + 10);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    threeState.controls = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.target.copy(muonPos);

    // Allow smooth panning and key controls
    controls.enablePan = true;
    controls.panSpeed = 1.0;
    controls.listenToKeyEvents(window);
    controls.keyPanSpeed = 18.0;
    controls.minDistance = 2.0;
    controls.maxDistance = 40.0;

    // Double-click to focus target on clicked atom
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onDoubleClick(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        
        // Raycast against all meshes/groups in the scene
        const targets = scene.children.filter(obj => obj.type === "Mesh" || obj.type === "Group");
        const intersects = raycaster.intersectObjects(targets, true);

        if (intersects.length > 0) {
            let hitObj = intersects[0].object;
            // Bubble up to direct children of the scene
            while (hitObj.parent && hitObj.parent !== scene) {
                hitObj = hitObj.parent;
            }
            
            const targetPos = new THREE.Vector3();
            hitObj.getWorldPosition(targetPos);
            
            // Smooth transition duration
            const duration = 600; 
            const startTarget = controls.target.clone();
            const startTime = Date.now();

            controls.autoRotate = false;

            function animateFocus() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const ease = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                controls.target.lerpVectors(startTarget, targetPos, ease);
                
                if (progress < 1) {
                    requestAnimationFrame(animateFocus);
                } else {
                    setTimeout(() => {
                        if (threeState.controls === controls) {
                            controls.autoRotate = true;
                        }
                    }, 2000);
                }
            }
            animateFocus();
        }
    }
    
    threeState.dblClickHandler = onDoubleClick;
    renderer.domElement.addEventListener('dblclick', onDoubleClick);

    // Add HUD overlay instructions
    const hud = document.createElement('div');
    hud.className = 'absolute bottom-4 left-4 z-20 bg-slate-950/85 backdrop-blur border border-slate-800/80 p-4 rounded-xl text-[10px] text-slate-400 font-mono pointer-events-none select-none max-w-xs shadow-2xl transition-opacity duration-300';
    hud.innerHTML = `
        <div class="text-indigo-400 font-bold mb-1.5 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <svg class="animate-pulse text-indigo-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Viewport Navigator
        </div>
        <ul class="space-y-1.5">
            <li><span class="text-slate-200 font-semibold">Left Click + Drag</span>: Rotate View</li>
            <li><span class="text-slate-200 font-semibold">Right Click + Drag / Arrows</span>: Pan Camera</li>
            <li><span class="text-slate-200 font-semibold">Scroll / Pinch</span>: Zoom In / Out</li>
            <li><span class="text-slate-200 font-semibold">Double Click Atom</span>: Focus / Center View</li>
        </ul>
    `;
    container.appendChild(hud);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Label creation utility
    function createLabelMaterial(text, colorStr, width = 128, height = 128, fontSize = 50) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.shadowColor = 'rgba(0,0,0,1)';
        ctx.shadowBlur = 4;
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(0,0,0,0.8)';
        ctx.strokeText(text, width / 2, height / 2);
        
        ctx.fillStyle = colorStr;
        ctx.fillText(text, width / 2, height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        return new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    }

    const ceLabelMat = createLabelMaterial('Ce', '#60a5fa', 128, 128, 50); 
    const inLabelMat = createLabelMaterial('In', '#c084fc', 128, 128, 50); 

    const isDistortion = (data && data.id === 'distortion');
    const bgOpacity = isDistortion ? 0.08 : 0.3;

    const ceMat = new THREE.MeshPhongMaterial({ color: 0x3b82f6, shininess: 100, transparent: true, opacity: bgOpacity }); 
    const inMat = new THREE.MeshPhongMaterial({ color: 0xa855f7, shininess: 80, transparent: true, opacity: bgOpacity });  
    
    const muMat = new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1.0 }); 
    const glowMat = new THREE.MeshBasicMaterial({ 
        color: 0xef4444, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false
    });

    const ceGeo = new THREE.SphereGeometry(0.7, 32, 32);  
    const inGeo = new THREE.SphereGeometry(0.45, 32, 32); 
    const muGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const glowGeo = new THREE.SphereGeometry(0.6, 32, 32);

    // Draw host Cerium atoms corners in 2x2x2 supercell
    for(let x=0; x<=2; x++) {
        for(let y=0; y<=2; y++) {
            for(let z=0; z<=2; z++) {
                const mesh = new THREE.Mesh(ceGeo, ceMat);
                mesh.position.set(x*a - centerOffset, y*a - centerOffset, z*a - centerOffset);
                
                const sprite = new THREE.Sprite(ceLabelMat);
                sprite.scale.set(1.4, 1.4, 1.4);
                mesh.add(sprite);

                if (data && data.showSpins) {
                    let spinDir = new THREE.Vector3();
                    let spinColor = 0x3b82f6;

                    // (111) AFM state ordering tagging
                    const planeIdx = x + y + z;
                    const isEven = planeIdx % 2 === 0;

                    if (currentMagState === 'AFM') {
                        // Spins flat in (111) sheets:
                        // Ce1 (even): [1, -1, 0], Ce2 (odd): [-1, 1, 0]
                        if (isEven) {
                            spinDir.set(1, -1, 0).normalize();
                            spinColor = 0xef4444; // Red for Ce1 Up-equivalent
                        } else {
                            spinDir.set(-1, 1, 0).normalize();
                            spinColor = 0x3b82f6; // Blue for Ce2 Down-equivalent
                        }
                    } else {
                        // FM State: all point along [1, -1, 0]
                        spinDir.set(1, -1, 0).normalize();
                        spinColor = 0xef4444;
                    }
                    
                    const origin = new THREE.Vector3(0, 0, 0); 
                    const arrowHelper = new THREE.ArrowHelper(spinDir, origin, 1.8, spinColor, 0.5, 0.3);
                    mesh.add(arrowHelper);
                }
                
                scene.add(mesh);
            }
        }
    }

    // Draw host Indium atoms (face centers)
    for(let x=0; x<2; x++) {
        for(let y=0; y<2; y++) {
            for(let z=0; z<=2; z++) {
                const mesh = new THREE.Mesh(inGeo, inMat);
                mesh.position.set((x+0.5)*a - centerOffset, (y+0.5)*a - centerOffset, z*a - centerOffset);
                const sprite = new THREE.Sprite(inLabelMat);
                sprite.scale.set(1.1, 1.1, 1.1);
                mesh.add(sprite);
                scene.add(mesh);
            }
        }
    }
    for(let x=0; x<2; x++) {
        for(let y=0; y<=2; y++) {
            for(let z=0; z<2; z++) {
                const mesh = new THREE.Mesh(inGeo, inMat);
                mesh.position.set((x+0.5)*a - centerOffset, y*a - centerOffset, (z+0.5)*a - centerOffset);
                const sprite = new THREE.Sprite(inLabelMat);
                sprite.scale.set(1.1, 1.1, 1.1);
                mesh.add(sprite);
                scene.add(mesh);
            }
        }
    }
    for(let x=0; x<=2; x++) {
        for(let y=0; y<2; y++) {
            for(let z=0; z<2; z++) {
                const mesh = new THREE.Mesh(inGeo, inMat);
                mesh.position.set(x*a - centerOffset, (y+0.5)*a - centerOffset, (z+0.5)*a - centerOffset);
                const sprite = new THREE.Sprite(inLabelMat);
                sprite.scale.set(1.1, 1.1, 1.1);
                mesh.add(sprite);
                scene.add(mesh);
            }
        }
    }

    // Build Muon group
    const muonGroup = new THREE.Group();
    // Center muonPos in supercell coordinates to match atomsGroup centering
    const centeredMuonPos = new THREE.Vector3(muonPos.x - centerOffset, muonPos.y - centerOffset, muonPos.z - centerOffset);
    muonGroup.position.copy(centeredMuonPos); 
    
    const muonMesh = new THREE.Mesh(muGeo, muMat);
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    
    muonGroup.add(muonMesh);
    muonGroup.add(glowMesh);
    
    const muLight = new THREE.PointLight(0xef4444, 2, 10);
    muonGroup.add(muLight);
    scene.add(muonGroup);

    // Neighbors of the stopping site -> 4 In atoms and 2 Ce corners for edge-center, or 6 In atoms for body-center
    const neighbors = [];
    if (isBodyCenter) {
        neighbors.push({ pos: new THREE.Vector3(1.5*a, 1.5*a, 1.5*a + 0.5*a), type: 'In' });
        neighbors.push({ pos: new THREE.Vector3(1.5*a, 1.5*a, 1.5*a - 0.5*a), type: 'In' });
        neighbors.push({ pos: new THREE.Vector3(1.5*a + 0.5*a, 1.5*a, 1.5*a), type: 'In' });
        neighbors.push({ pos: new THREE.Vector3(1.5*a - 0.5*a, 1.5*a, 1.5*a), type: 'In' });
        neighbors.push({ pos: new THREE.Vector3(1.5*a, 1.5*a + 0.5*a, 1.5*a), type: 'In' });
        neighbors.push({ pos: new THREE.Vector3(1.5*a, 1.5*a - 0.5*a, 1.5*a), type: 'In' });
    } else {
        neighbors.push({ pos: new THREE.Vector3(1.5*a, 1.5*a, a), type: 'In' });
        neighbors.push({ pos: new THREE.Vector3(1.5*a, 0.5*a, a), type: 'In' });
        neighbors.push({ pos: new THREE.Vector3(1.5*a, a, 1.5*a), type: 'In' });
        neighbors.push({ pos: new THREE.Vector3(1.5*a, a, 0.5*a), type: 'In' });
        neighbors.push({ pos: new THREE.Vector3(a, a, a), type: 'Ce' });
        neighbors.push({ pos: new THREE.Vector3(2*a, a, a), type: 'Ce' });
    }

    const muonPristineCentered = new THREE.Vector3(
        1.5*a - centerOffset,
        (isBodyCenter ? 1.5*a : a) - centerOffset,
        (isBodyCenter ? 1.5*a : a) - centerOffset
    );

    if (isDistortion) {
        // Draw Pristine Muon Site as a yellow indicator
        const pristineMuGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const pristineMuMat = new THREE.MeshPhongMaterial({ color: 0xeab308, transparent: true, opacity: 0.6 });
        const pristineMuMesh = new THREE.Mesh(pristineMuGeo, pristineMuMat);
        pristineMuMesh.position.copy(muonPristineCentered);
        scene.add(pristineMuMesh);
        
        // Add a line between pristine muon and relaxed muon to show the relaxation displacement
        const dispLineGeo = new THREE.BufferGeometry().setFromPoints([muonPristineCentered, centeredMuonPos]);
        const dispLineMat = new THREE.LineDashedMaterial({ color: 0xeab308, dashSize: 0.15, gapSize: 0.08 });
        const dispLine = new THREE.Line(dispLineGeo, dispLineMat);
        dispLine.computeLineDistances();
        scene.add(dispLine);
        
        // Label for displacement
        const dispLabelMat = createLabelMaterial('Relaxation', '#eab308', 512, 256, 70);
        const dispLabelSprite = new THREE.Sprite(dispLabelMat);
        dispLabelSprite.position.copy(muonPristineCentered).lerp(centeredMuonPos, 0.5).add(new THREE.Vector3(0, 0.35, 0));
        dispLabelSprite.scale.set(1.4, 0.7, 1.0);
        scene.add(dispLabelSprite);

        // Draw neighbors with distortion displacements
        neighbors.forEach(neighbor => {
            const centeredNPos = new THREE.Vector3(neighbor.pos.x - centerOffset, neighbor.pos.y - centerOffset, neighbor.pos.z - centerOffset);
            
            // Radial direction from pristine muon
            const dir = centeredNPos.clone().sub(muonPristineCentered).normalize();
            
            // Calculate relaxed neighbor position (shifted outward by dynamic local breathing)
            let localPct = 3.55;
            if (typeof DYNAMIC_BRANCH_RESULTS !== 'undefined' && DYNAMIC_BRANCH_RESULTS[bid]) {
                const bRes = DYNAMIC_BRANCH_RESULTS[bid];
                if (bRes.distortion && bRes.distortion.local_distortion !== undefined) {
                    localPct = bRes.distortion.local_distortion;
                }
            }
            const localDist = localPct / 100.0;
            // Exaggerate it slightly in visualizer for clear visible comparison (reduced from 3.5 to 1.0 to prevent overlap for negative distortions)
            const centeredRelaxedNPos = centeredNPos.clone().add(dir.clone().multiplyScalar(localDist * 1.0 * a)); 
            
            // 1. Draw pristine neighbor position as small wireframe/transparent sphere
            const pNeighborGeo = new THREE.SphereGeometry(neighbor.type === 'Ce' ? 0.35 : 0.22, 16, 16);
            const pNeighborMat = new THREE.MeshBasicMaterial({ color: 0x64748b, wireframe: true, transparent: true, opacity: 0.25 });
            const pNeighborMesh = new THREE.Mesh(pNeighborGeo, pNeighborMat);
            pNeighborMesh.position.copy(centeredNPos);
            scene.add(pNeighborMesh);
            
            // 2. Draw relaxed neighbor as solid glowing sphere
            const rNeighborGeo = new THREE.SphereGeometry(neighbor.type === 'Ce' ? 0.7 : 0.45, 32, 32);
            const rColor = neighbor.type === 'Ce' ? 0x3b82f6 : 0xa855f7;
            const rNeighborMat = new THREE.MeshPhongMaterial({ color: rColor, shininess: 100 });
            const rNeighborMesh = new THREE.Mesh(rNeighborGeo, rNeighborMat);
            rNeighborMesh.position.copy(centeredRelaxedNPos);
            scene.add(rNeighborMesh);

            // Add labels for atoms at relaxed position
            const spriteMat = neighbor.type === 'Ce' ? ceLabelMat : inLabelMat;
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(1.1, 1.1, 1.1);
            rNeighborMesh.add(sprite);

            // 3. Draw displacement vector line and arrow from pristine to relaxed neighbor if there is motion
            const dispVec = centeredRelaxedNPos.clone().sub(centeredNPos);
            const dispLen = dispVec.length();
            if (dispLen > 0.01) {
                const vecLineGeo = new THREE.BufferGeometry().setFromPoints([centeredNPos, centeredRelaxedNPos]);
                const vecLineMat = new THREE.LineBasicMaterial({ color: 0x10b981 }); // Green for movement
                const vecLine = new THREE.Line(vecLineGeo, vecLineMat);
                scene.add(vecLine);
                
                const dispDir = dispVec.clone().normalize();
                const arrowHelper = new THREE.ArrowHelper(dispDir, centeredNPos, dispLen, 0x10b981, 0.25, 0.15);
                scene.add(arrowHelper);
            }
            
            // 4. Draw pristine thin bond (dashed)
            const pBondGeo = new THREE.BufferGeometry().setFromPoints([muonPristineCentered, centeredNPos]);
            const pBondMat = new THREE.LineDashedMaterial({ color: 0xeab308, dashSize: 0.1, gapSize: 0.08, opacity: 0.35, transparent: true });
            const pBond = new THREE.Line(pBondGeo, pBondMat);
            pBond.computeLineDistances();
            scene.add(pBond);
            
            // 5. Draw relaxed thick bond
            const distance = centeredMuonPos.distanceTo(centeredRelaxedNPos);
            const rBondMat = new THREE.MeshPhongMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 }); // Green active bond
            const cylinderGeo = new THREE.CylinderGeometry(0.05, 0.05, distance, 8);
            const rBondMesh = new THREE.Mesh(cylinderGeo, rBondMat);
            rBondMesh.position.copy(centeredMuonPos).lerp(centeredRelaxedNPos, 0.5);
            rBondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), centeredRelaxedNPos.clone().sub(centeredMuonPos).normalize());
            scene.add(rBondMesh);

            // Calculate physical coordinates dynamically (unexaggerated) to display the correct splitting
            const pristineMuon = new THREE.Vector3(1.5 * a, isBodyCenter ? 1.5 * a : a, isBodyCenter ? 1.5 * a : a);
            const physicalMuon = pristineMuon.clone().add(new THREE.Vector3(dx, dy, dz));
            
            const pristineNeighbor = neighbor.pos.clone();
            const pristineVec = pristineNeighbor.clone().sub(pristineMuon);
            
            // Neighbor undergoes local breathing relaxation
            const physicalNeighbor = pristineNeighbor.clone().add(pristineVec.clone().multiplyScalar(localDist));
            
            const pristineDist = pristineMuon.distanceTo(pristineNeighbor);
            const physicalDist = physicalMuon.distanceTo(physicalNeighbor);
            
            const labelText = `${pristineDist.toFixed(2)} Å → ${physicalDist.toFixed(2)} Å`;
            
            const distLabelMat = createLabelMaterial(labelText, '#10b981', 512, 256, 60);
            const distLabelSprite = new THREE.Sprite(distLabelMat);
            distLabelSprite.position.copy(centeredMuonPos).lerp(centeredRelaxedNPos, 0.55).add(new THREE.Vector3(0.05, 0.25, 0.05));
            distLabelSprite.scale.set(1.5, 0.75, 1.0);
            scene.add(distLabelSprite);
        });
    } else {
        // DEFAULT: Draw standard bonds
        const bondMat = new THREE.MeshPhongMaterial({ color: 0xef4444, transparent: true, opacity: 0.6 });
        
        neighbors.forEach(neighbor => {
            const centeredNPos = new THREE.Vector3(neighbor.pos.x - centerOffset, neighbor.pos.y - centerOffset, neighbor.pos.z - centerOffset);
            const distance = centeredMuonPos.distanceTo(centeredNPos);
            const cylinderGeo = new THREE.CylinderGeometry(0.04, 0.04, distance, 8);
            const mesh = new THREE.Mesh(cylinderGeo, bondMat);
            mesh.position.copy(centeredMuonPos).lerp(centeredNPos, 0.5);
            mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), centeredNPos.clone().sub(centeredMuonPos).normalize());
            scene.add(mesh);
        });
    }

    // Draw bounding lines
    const boxGeo = new THREE.BoxGeometry(2*a, 2*a, 2*a);
    const edges = new THREE.EdgesGeometry(boxGeo);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x1f2937, opacity: 0.8, transparent: true }));
    scene.add(line);

    const startTime = Date.now();
    function animate() {
        threeState.animationId = requestAnimationFrame(animate);
        
        if(threeState.controls) threeState.controls.update();
        
        const elapsed = Date.now() - startTime;
        const scale = 1.0 + 0.15 * Math.sin(elapsed * 0.005);
        glowMesh.scale.set(scale, scale, scale);
        glowMesh.material.opacity = 0.4 + 0.2 * Math.sin(elapsed * 0.005);
        muLight.intensity = 1.5 + 0.5 * Math.sin(elapsed * 0.005);

        if(threeState.renderer && threeState.scene && threeState.camera) {
            threeState.renderer.render(threeState.scene, threeState.camera);
        }
    }
    animate();

    threeState.observer = new ResizeObserver(() => {
        if (container && container.clientWidth && threeState.camera && threeState.renderer) {
            threeState.camera.aspect = container.clientWidth / container.clientHeight;
            threeState.camera.updateProjectionMatrix();
            threeState.renderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
    threeState.observer.observe(container);
}
