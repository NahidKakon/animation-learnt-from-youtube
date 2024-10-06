import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"



export default function Model() {
  const group = useRef<Group>(null)
  const { nodes, materials, animations, scene } = useGLTF(
    "/robot_playground.glb"
  )
  const { actions, clips } = useAnimations(animations, scene)
  const scroll = useScroll()

  useEffect(() => {
    console.log(actions)
    //@ts-ignore
    actions["Experiment"].play().paused = true
  }, [])
  useFrame(
    () =>
      //@ts-ignore
      (actions["Experiment"].time =
        //@ts-ignore
        (actions["Experiment"].getClip().duration * scroll.offset) / 3)
  )
  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}
