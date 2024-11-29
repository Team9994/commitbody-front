import { Button } from '@/components/ui/button';
import Image from 'next/image';
interface RoutineDrawerBtnProps {
  text: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  image?: string;
  onClick?: () => void;
}

const RoutineDrawerBtn = ({
  text,
  width,
  height,
  backgroundColor,
  image,
  onClick,
}: RoutineDrawerBtnProps) => {
  return (
    <Button
      className={`text-base leading-6 bg-${backgroundColor} !border-blue !border`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      {image && <Image src={image} alt="운동 시작" width={20} height={20} className="" />}
      {text}
    </Button>
  );
};

export default RoutineDrawerBtn;
