import {
  SURFACE_CONCENTRATION,
  DOPED_THICKNESS,
  DIFFUSION_CONSTANT_FOR_BORON,
  ACTIVATION_ENERGY,
  BOLTZMANN_CONSTANT,
  TEMPERATURE
} from '../constants/index';

import * as math from 'mathjs';

import { Cell } from '../types';

export const concentrationDistribution = (
  step: number,
  plane: number,
  time: number
): Cell[] => {
  const data = [];
  for (let i = 0; i < plane; i += step) {

    let result: Cell = {
      x: 0,
      y: 0
    };

    const diffusionConstant = DIFFUSION_CONSTANT_FOR_BORON * math.exp(-(ACTIVATION_ENERGY / BOLTZMANN_CONSTANT / TEMPERATURE));

    const equationPartOne = math.erf((DOPED_THICKNESS - i) / (2 * math.sqrt(diffusionConstant * time)));
    const equationPartTwo = math.erf((DOPED_THICKNESS + i) / (2 * math.sqrt(diffusionConstant * time)));

    const fraction = equationPartOne + equationPartTwo;
    const equationMainBLock = SURFACE_CONCENTRATION / 2 * fraction;

    result.x = parseFloat((i / 1e-7).toFixed(3));
    result.y = equationMainBLock / 1e20;

    data.push(result);
  }

  return data;
};
