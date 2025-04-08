function sayHello() {
    alert("hey i have created alert!");
  }
  
  function changeGreeting() {
    document.getElementById("greet").innerText = "You're awesome 😎";
  }
  
  function changeBackground() {
    document.body.style.backgroundColor = "#f0f0f0";
  }
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  function Main() {
    document.body.style.color = "#00bcd4";
  }

  window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);
  
    const createScene = () => {
      const scene = new BABYLON.Scene(engine);
  
      // HDRI lighting
      const hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(
        "https://playground.babylonjs.com/textures/environment.env",
        scene
      );
      scene.environmentTexture = hdrTexture;
  
      //Optional: skybox (comment out to hide background)
       scene.createDefaultSkybox(hdrTexture, true, 1000, 0.3);
  
      // Camera
      const camera = new BABYLON.ArcRotateCamera("camera", 
        Math.PI / 2, Math.PI / 4, 3, BABYLON.Vector3.Zero(), scene);
      camera.attachControl(canvas, true);
  
      // PBR Material Sphere
      const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: .5 }, scene);
      const pbr = new BABYLON.PBRMaterial("pbr", scene);
      pbr.metallic = 1.0;
      pbr.roughness = 0.1;
      sphere.material = pbr;
  
      return scene;
    };
  
    const scene = createScene();
  
    engine.runRenderLoop(() => {
      scene.render();
    });
  
    window.addEventListener("resize", () => {
      engine.resize();
    });
  });