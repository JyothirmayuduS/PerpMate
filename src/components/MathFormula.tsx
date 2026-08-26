import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathFormulaProps {
  math: string;
  block?: boolean;
}

export default function MathFormula({ math, block = false }: MathFormulaProps) {
  if (block) {
    const wrappedMath = math.includes('\\\\')
      ? `\\begin{array}{l} \\displaystyle ${math.replace(/\\\\/g, '\\\\[1.5em] \\displaystyle ')} \\end{array}`
      : `\\displaystyle ${math}`;
    return <BlockMath math={wrappedMath} />;
  }
  return <InlineMath math={math} />;
}
