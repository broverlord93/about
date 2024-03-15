import helvetiker from "@assets/fonts/helvetiker_regular.typeface.json";
import { Canvas, extend } from "@react-three/fiber";
import { FC } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const NavBranding: FC<{ className: string }> = ({ className }) => {
  extend({ TextGeometry });
  const message = "My Awesome Website!";
  const font = new FontLoader().parse(helvetiker);

  return (
    <Canvas className={className}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <mesh>
        <textGeometry args={[message, { font, size: 1, height: 0.5 }]} />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
};

export default NavBranding;
