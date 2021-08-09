import { Canvas } from '@antv/g-canvas';
import { Circle, Group } from '@antv/g';
import * as dat from 'dat.gui';
import Stats from 'stats.js';

/**
solarSystem
   |    |
   |   sun
   |
 earthOrbit
   |    |
   |  earth
   |
  moonOrbit
      |
     moon
 */

const canvas = new Canvas({
  container: 'container',
  width: 600,
  height: 500,
  dirtyRectangle: {
    enable: true,
    debug: true,
  },
});

const solarSystem = new Group({
  name: 'solarSystem',
});
const earthOrbit = new Group({
  name: 'earthOrbit',
});
const moonOrbit = new Group({
  name: 'moonOrbit',
});

const sun = new Circle({
  name: 'sun',
  style: {
    r: 100,
    fill: '#1890FF',
    stroke: '#F04864',
    lineWidth: 4,
  },
});
const earth = new Circle({
  name: 'earth',
  style: {
    r: 50,
    fill: '#1890FF',
    stroke: '#F04864',
    lineWidth: 4,
  },
});
const moon = new Circle({
  name: 'moon',
  style: {
    r: 25,
    fill: '#1890FF',
    stroke: '#F04864',
    lineWidth: 4,
  },
});

solarSystem.appendChild(sun);
solarSystem.appendChild(earthOrbit);
earthOrbit.appendChild(earth);
earthOrbit.appendChild(moonOrbit);
moonOrbit.appendChild(moon);

solarSystem.setPosition(300, 250);
earthOrbit.translate(100, 0);
moonOrbit.translate(100, 0);

canvas.appendChild(solarSystem);

// stats
const stats = new Stats();
stats.showPanel(0);
const $stats = stats.dom;
$stats.style.position = 'absolute';
$stats.style.left = '0px';
$stats.style.top = '0px';
const $wrapper = document.getElementById('container');
$wrapper.appendChild($stats);
canvas.on('afterRender', () => {
  if (stats) {
    stats.update();
  }

  solarSystem.rotateLocal(1);
  earthOrbit.rotateLocal(2);
});

// GUI
const gui = new dat.GUI({ autoPlace: false });
$wrapper.appendChild(gui.domElement);
const folder0 = gui.addFolder('dirty rectangle');
const dirtyRectangleConfig = {
  enable: true,
  debug: true,
};
folder0.add(dirtyRectangleConfig, 'enable').onChange((enable) => {
  canvas.setRenderer({
    dirtyRectangle: {
      enable,
      debug: dirtyRectangleConfig.debug,
    },
  });
});
folder0.add(dirtyRectangleConfig, 'debug').onChange((debug) => {
  canvas.setRenderer({
    dirtyRectangle: {
      enable: dirtyRectangleConfig.enable,
      debug,
    },
  });
});
folder0.open();

const folder1 = gui.addFolder('visibility');
const config = {
  earthOrbit: true,
  moonOrbit: true,
};
folder1.add(config, 'earthOrbit').onChange((visible) => {
  if (visible) {
    earthOrbit.show();
  } else {
    earthOrbit.hide();
  }
});
folder1.add(config, 'moonOrbit').onChange((visible) => {
  if (visible) {
    moonOrbit.show();
  } else {
    moonOrbit.hide();
  }
});
folder1.open();

const folder2 = gui.addFolder('z-index');
const zIndexConfig = {
  earthOrbit: 0,
  sun: 0,
  bringToFront: false,
};
folder2.add(zIndexConfig, 'bringToFront').onChange((toFront) => {
  if (toFront) {
    sun.toFront();
  } else {
    sun.toBack();
  }
});
folder2.add(zIndexConfig, 'sun', 0, 100).onChange((zIndex) => {
  sun.setZIndex(zIndex);
});
folder2.add(zIndexConfig, 'earthOrbit', 0, 100).onChange((zIndex) => {
  earthOrbit.setZIndex(zIndex);
});
folder2.open();
