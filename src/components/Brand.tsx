import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";

const Brand: FC<{ className: string }> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas className={`${className}-canvas`}>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 10]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
        <Center position={[0, 0, 0]} rotation={[0, 0, 0]}>
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
            {`Limani.dev`}
            <meshStandardMaterial
              attach={"material-0"}
              // color={palette.primary}
            />
            <meshStandardMaterial
              attach={"material-1"}
              // color={palette.success}
            />
          </Text3D>
        </Center>
      </Canvas>
    </div>
  );
};

export default Brand;
