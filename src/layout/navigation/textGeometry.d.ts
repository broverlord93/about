import React from "react";

/**
 * This declaration is necessary for React to recognize
 * lower case tags as valid JSX elements.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: React.DetailedHTMLProps<T, HTMLElement>;
    }
  }
}
