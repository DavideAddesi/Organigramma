import * as React from 'react';
import { css, cx } from '@emotion/css';
import type { ReactNode } from 'react';
import clsx from "clsx"

export interface TreeNodeProps {
  /**
   * The node label
   * */
  label: React.ReactNode;
  className?: string;
  children?: ReactNode;
  direction: string;
  childrendirection:string;
}

const verticalLine = css`
  content: '';
  position: absolute;
  top: 0;
  height: calc(var(--tree-line-height));
  box-sizing: border-box;
`;

const orizontalLine = css`
  content: '';
  position: absolute;
  top: 50;
  height: var(--tree-line-height);
  box-sizing: border-box;
`;

const childrenContainer = css`
  display:flex;
  padding-inline-start: 0;
  margin: 0;
  padding-top: calc(var(--tree-line-height)) ;
  position: relative;
  ::before {
    ${verticalLine};
    left: 50%;
    width: 0;
    border-left: var(--tree-line-width) solid var(--tree-line-color);
  }
`;

const childrenContainerOrizzontale = css`
  display:flex;
  padding-inline-start: 0;
  margin: 0;
  padding-top: var(--tree-line-height);
  position: relative;
  ::before {
    ${verticalLine};
    left: 0%;
    width: 0;
    border-left: var(--tree-line-width) solid var(--tree-line-color);

  }
  
`;

const flexDir = css`
    flex-direction: column;
`;

const node = css`
  flex: auto;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: var(--tree-line-height) var(--tree-node-padding) 0
    var(--tree-node-padding);
`;

const nodeLines = css`
  ::before,
  ::after {
    ${verticalLine};
    right: 50%;
    width: 50%;
    border-top: var(--tree-line-width) solid var(--tree-line-color);
  }
  ::after {
    left: 50%;
    border-left: var(--tree-line-width) solid var(--tree-line-color);
  }
  :only-of-type {
    padding: 0;
    ::after,
    :before {
      display: none;
    }
  }
  :first-of-type {
    ::before {
      border: 0 none;
    }
    ::after {
      border-radius: var(--tree-line-border-radius) 0 0 0;
    }
  }
  :last-of-type {
    ::before {
      border-right: var(--tree-line-width) solid var(--tree-line-color);
      border-radius: 0 var(--tree-line-border-radius) 0 0;
    }
    ::after {
      border: 0 none;
    }
  }
`;
const nodeLinesOrizzontale = css`

padding-left: 15px ;

::before{
  ${verticalLine};
  left: 0%;
  width: 15px;
  height: 100%;
  border-left: var(--tree-line-width) solid var(--tree-line-color);
}
::after {
  ${verticalLine};
  left: 0%;
  width: 15px;
  height: 55px;
  border-bottom: var(--tree-line-width) solid var(--tree-line-color);
  border-radius: 0 var(--tree-line-border-radius);
}

:last-of-type {
  ::before {
    left: 0%;
  width: 15px;
  height: 55px;
  border-top: 0 px;
  border-right: 0 px;
  
  border-left: var(--tree-line-width) solid var(--tree-line-color);
  border-radius: 0 0 0 var(--tree-line-border-radius);
}

}
 
   
  }
`;

function TreeNode({ children, label, className, direction, childrendirection }: TreeNodeProps) {
  return (
    <li className={cx(node, direction == "column" ? nodeLinesOrizzontale : nodeLines, className)}>
      {label}
      {React.Children.count(children) > 0 && (
        <ul className={clsx( {[flexDir]: childrendirection=="column", [childrenContainerOrizzontale]: childrendirection == "column", [childrenContainer]: childrendirection!="column"})} >{children}</ul>
        // <ul className={childrenContainer} >{children}</ul>
      )}
    </li>
  );
}

export default TreeNode;