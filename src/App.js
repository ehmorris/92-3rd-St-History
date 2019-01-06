import React, { Component } from 'react';
import * as THREE from 'three';

class App extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const cube = new THREE.Mesh(geometry, material);

    camera.position.z = 2;
    scene.add(cube);
    renderer.setClearColor('#fff');
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;

    window.addEventListener('resize', this.handleResize);

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  handleResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop = () => cancelAnimationFrame(this.frameId);

  animate = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div style={{
        display: 'grid',
      }}>
        <div
          style={{
            height: '80vh',
            width: '100vw',
          }}
          ref={mount => {
            this.mount = mount
          }}
        />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta lacus a sem congue mollis. Nam auctor laoreet neque, in tincidunt ipsum viverra ac. Donec massa ligula, tempus in varius nec, ultricies non erat. Vestibulum vitae diam erat. Mauris justo justo, sagittis vitae ornare id, commodo eget ante. Fusce eget rhoncus massa. Nulla facilisi.</p>
        <p>Integer et finibus augue. Nunc justo nulla, hendrerit quis vulputate sed, consequat sed eros. Donec malesuada vitae mauris hendrerit mollis. Vestibulum tellus leo, blandit sit amet semper eget, tincidunt et ligula. Fusce vulputate suscipit nibh a cursus. Nunc commodo id magna et iaculis. Mauris eget ultrices ante. Quisque tincidunt tellus et eros sodales sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque gravida euismod efficitur. Proin et blandit turpis, sed placerat nisi. Donec finibus mattis vulputate. Nunc ac mollis ex. Curabitur interdum, sapien ac suscipit pharetra, nibh libero rutrum mauris, a imperdiet arcu nulla eget nunc. In eu massa condimentum, elementum purus sit amet, lobortis ipsum.</p>
        <p>Aenean vitae tincidunt justo. Cras turpis leo, condimentum ac dui tincidunt, elementum accumsan metus. Quisque ultrices id risus eu gravida. Aenean suscipit iaculis commodo. Ut ut ornare lacus, eget bibendum lectus. Maecenas eu interdum nibh. Donec efficitur justo quis egestas sodales. Etiam tempus facilisis risus in sollicitudin.</p>
      </div>
    );
  }
}

export default App;
