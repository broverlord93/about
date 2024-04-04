import * as palette from "@assets/scss/palette.module.scss";
import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";

const HeaderBrand: FC<{ className: string }> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas className={`${className}-canvas`}>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 10]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 4}
        />
        <Center rotation={[-0.5, -0.25, 0]}>
          <Text3D
            curveSegments={32}
            bevelEnabled
            bevelSize={0.05}
            bevelThickness={0.1}
            height={0.2}
            lineHeight={0.8}
            letterSpacing={0}
            size={1.5}
            font={"/src/assets/fonts/helvetiker_regular.typeface.json"}
          >
            {`Limani\n  .dev`}
            <meshStandardMaterial
              attach={"material-0"}
              color={palette.primary}
            />
            <meshStandardMaterial
              attach={"material-1"}
              color={palette.success}
            />
          </Text3D>
        </Center>
      </Canvas>
    </div>
  );
};

export default HeaderBrand;
