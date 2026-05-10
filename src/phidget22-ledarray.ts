import * as phidget22 from 'phidget22-net';
import * as nodeRED from 'node-red';

import {
  getInvokePhidgetMethod,
  openPhidgetDevice,
  PhidgetNodeConfig,
  setupPhidgetDevice,
} from './common';

type LEDArrayColor = {
  r: number;
  g: number;
  b: number;
  w?: number;
};

type LEDArrayAnimation = {
  startAddress: number;
  endAddress: number;
  time: number;
  animationType: number;
};

type LEDArrayNodeExtraConfig = {
  brightness: number;
  colorOrder: number;
  gamma: number;
  powerEnabled: boolean;
};
type LEDArrayNodeConfig = nodeRED.NodeDef & PhidgetNodeConfig & LEDArrayNodeExtraConfig;

module.exports = function (RED: nodeRED.NodeAPI) {
  function Phidget22LEDArrayNode(this: nodeRED.Node, config: LEDArrayNodeConfig) {
    RED.nodes.createNode(this, config);
    const node = this;
    const state: { didAttach: boolean } = { didAttach: false };
    const ledArray = new phidget22.LEDArray();
    const invokeMethod = getInvokePhidgetMethod(node, config.debug);

    ledArray.onAttach = () => {
      invokeMethod(() => ledArray.setColorOrder(config.colorOrder), 'setColorOrder (in onAttach)');
      invokeMethod(() => ledArray.setGamma(config.gamma), 'setGamma (in onAttach)');
      invokeMethod(() => ledArray.setBrightness(config.brightness), 'setBrightness (in onAttach)');
      invokeMethod(
        () => ledArray.setPowerEnabled(config.powerEnabled),
        'setPowerEnabled (in onAttach)',
      );
      const msg = { topic: 'Attach', payload: {} };
      state.didAttach = true;
      node.status({ fill: 'green', shape: 'dot', text: 'attached' });
      node.send(msg);
    };

    setupPhidgetDevice(ledArray, node, config);
    openPhidgetDevice(ledArray, 'LEDArray', node, state, config);

    node.on('input', async (msg: any) => {
      switch (msg.topic) {
        case 'setAnimation': {
          invokeMethod(
            () =>
              ledArray.setAnimation(
                msg.payload?.animationID,
                msg.payload?.pattern as any,
                msg.payload?.animation as LEDArrayAnimation,
              ),
            'setAnimation',
          );
          break;
        }
        case 'getMinAddress': {
          const minAddress = await invokeMethod(() => ledArray.getMinAddress(), 'getMinAddress');
          msg.payload = { minAddress };
          node.send(msg);
          break;
        }
        case 'getMaxAddress': {
          const maxAddress = await invokeMethod(() => ledArray.getMaxAddress(), 'getMaxAddress');
          msg.payload = { maxAddress };
          node.send(msg);
          break;
        }
        case 'getMinAnimationID': {
          const minAnimationID = await invokeMethod(
            () => ledArray.getMinAnimationID(),
            'getMinAnimationID',
          );
          msg.payload = { minAnimationID };
          node.send(msg);
          break;
        }
        case 'getMaxAnimationID': {
          const maxAnimationID = await invokeMethod(
            () => ledArray.getMaxAnimationID(),
            'getMaxAnimationID',
          );
          msg.payload = { maxAnimationID };
          node.send(msg);
          break;
        }
        case 'getMinAnimationPatternCount': {
          const minAnimationPatternCount = await invokeMethod(
            () => ledArray.getMinAnimationPatternCount(),
            'getMinAnimationPatternCount',
          );
          msg.payload = { minAnimationPatternCount };
          node.send(msg);
          break;
        }
        case 'getMaxAnimationPatternCount': {
          const maxAnimationPatternCount = await invokeMethod(
            () => ledArray.getMaxAnimationPatternCount(),
            'getMaxAnimationPatternCount',
          );
          msg.payload = { maxAnimationPatternCount };
          node.send(msg);
          break;
        }
        case 'getBrightness': {
          const brightness = await invokeMethod(() => ledArray.getBrightness(), 'getBrightness');
          msg.payload = { brightness };
          node.send(msg);
          break;
        }
        case 'setBrightness': {
          invokeMethod(() => ledArray.setBrightness(msg.payload?.brightness), 'setBrightness');
          break;
        }
        case 'getMinBrightness': {
          const minBrightness = await invokeMethod(
            () => ledArray.getMinBrightness(),
            'getMinBrightness',
          );
          msg.payload = { minBrightness };
          node.send(msg);
          break;
        }
        case 'getMaxBrightness': {
          const maxBrightness = await invokeMethod(
            () => ledArray.getMaxBrightness(),
            'getMaxBrightness',
          );
          msg.payload = { maxBrightness };
          node.send(msg);
          break;
        }
        case 'clearLEDs': {
          invokeMethod(() => ledArray.clearLEDs(), 'clearLEDs');
          break;
        }
        case 'getColorOrder': {
          const colorOrder = await invokeMethod(() => ledArray.getColorOrder(), 'getColorOrder');
          msg.payload = { colorOrder };
          node.send(msg);
          break;
        }
        case 'setColorOrder': {
          invokeMethod(() => ledArray.setColorOrder(msg.payload?.colorOrder), 'setColorOrder');
          break;
        }
        case 'getMinFadeTime': {
          const minFadeTime = await invokeMethod(() => ledArray.getMinFadeTime(), 'getMinFadeTime');
          msg.payload = { minFadeTime };
          node.send(msg);
          break;
        }
        case 'getMaxFadeTime': {
          const maxFadeTime = await invokeMethod(() => ledArray.getMaxFadeTime(), 'getMaxFadeTime');
          msg.payload = { maxFadeTime };
          node.send(msg);
          break;
        }
        case 'getGamma': {
          const gamma = await invokeMethod(() => ledArray.getGamma(), 'getGamma');
          msg.payload = { gamma };
          node.send(msg);
          break;
        }
        case 'setGamma': {
          invokeMethod(() => ledArray.setGamma(msg.payload?.gamma), 'setGamma');
          break;
        }
        case 'getMinGamma': {
          const minGamma = await invokeMethod(() => ledArray.getMinGamma(), 'getMinGamma');
          msg.payload = { minGamma };
          node.send(msg);
          break;
        }
        case 'getMaxGamma': {
          const maxGamma = await invokeMethod(() => ledArray.getMaxGamma(), 'getMaxGamma');
          msg.payload = { maxGamma };
          node.send(msg);
          break;
        }
        case 'setLED': {
          invokeMethod(
            () =>
              ledArray.setLED(
                msg.payload?.address,
                msg.payload?.color as any,
                msg.payload?.fadeTime,
              ),
            'setLED',
          );
          break;
        }
        case 'getMinLEDCount': {
          const minLEDCount = await invokeMethod(() => ledArray.getMinLEDCount(), 'getMinLEDCount');
          msg.payload = { minLEDCount };
          node.send(msg);
          break;
        }
        case 'getMaxLEDCount': {
          const maxLEDCount = await invokeMethod(() => ledArray.getMaxLEDCount(), 'getMaxLEDCount');
          msg.payload = { maxLEDCount };
          node.send(msg);
          break;
        }
        case 'setLEDs': {
          invokeMethod(
            () =>
              ledArray.setLEDs(
                msg.payload?.startAddress,
                msg.payload?.endAddress,
                msg.payload?.leds as any,
                msg.payload?.fadeTime,
              ),
            'setLEDs',
          );
          break;
        }
        case 'getPowerEnabled': {
          const powerEnabled = await invokeMethod(
            () => ledArray.getPowerEnabled(),
            'getPowerEnabled',
          );
          msg.payload = { powerEnabled };
          node.send(msg);
          break;
        }
        case 'setPowerEnabled': {
          invokeMethod(
            () => ledArray.setPowerEnabled(msg.payload?.powerEnabled),
            'setPowerEnabled',
          );
          break;
        }
        case 'stopAnimation': {
          invokeMethod(() => ledArray.stopAnimation(msg.payload?.animationID), 'stopAnimation');
          break;
        }
        case 'synchronizeAnimations': {
          invokeMethod(() => ledArray.synchronizeAnimations(), 'synchronizeAnimations');
          break;
        }
        default: {
          node.error('Unsupported message topic: ' + msg.topic);
          break;
        }
      }
    });
  }
  RED.nodes.registerType('phidget22-ledarray', Phidget22LEDArrayNode);
};
