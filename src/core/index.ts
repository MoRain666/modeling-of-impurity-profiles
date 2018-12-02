import {
  SURFACE_CONCENTRATION,
  DOPED_THICKNESS,
  DIFFUSION_CONSTANT_FOR_BORON,
  ACTIVATION_ENERGY,
  BOLTZMANN_CONSTANT,
  TEMPERATURE
} from '../constants/index';

import * as math from 'mathjs';

export const concentrationDistribution = (
  step: number,
  plane: number,
  time: number
) => {
  const result = {};
  for (let i = 0; i < plane; i += step) {
    const diffusionConstant = DIFFUSION_CONSTANT_FOR_BORON * math.exp(-ACTIVATION_ENERGY / BOLTZMANN_CONSTANT / TEMPERATURE);
    const equationPartOne = math.erf(Math.trunc((DOPED_THICKNESS - i) / (2 * math.sqrt(diffusionConstant * time))));
    const equationPartTwo = math.erf(Math.trunc((DOPED_THICKNESS + i) / (2 * math.sqrt(diffusionConstant * time))));
    const fraction = math.abs(parseInt(equationPartOne + equationPartTwo) - (equationPartOne + equationPartTwo));
    const equationMainBLock = SURFACE_CONCENTRATION / 2 * fraction / 10e9;
    result[`step:${i.toFixed(6)}`] = equationMainBLock;
  }
  return result;
};
