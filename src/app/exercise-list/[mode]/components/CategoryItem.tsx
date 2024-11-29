import { CategoryKey } from '@/app/custom-exercise/constants';
import Image from 'next/image';

interface CategoryItemProps {
  categoryKey: CategoryKey;
  label: string;
  selected: boolean;
  onClick: () => void;
  hasItems: boolean;
  selectedTool: string;
  selectedBodyPart: string;
}

const CategoryItem = ({
  categoryKey,
  label,
  selected,
  onClick,
  hasItems,
  selectedTool,
  selectedBodyPart,
}: CategoryItemProps) => (
  <div
    onClick={onClick}
    className={`h-9 px-4 py-2 flex items-center text-text-sm justify-center rounded-[18px]  border border-backgrounds-light min-w-[73px] ${
      selected ? 'border-blue text-blue bg-[#1F3750]' : 'bg-transparent text-text-sub'
    } cursor-pointer`}
  >
    {!hasItems && <span className="flex-shrink-0">{label}</span>}
    {hasItems && (
      <>
        <span className="flex-shrink-0">{categoryKey === 'tool' && (selectedTool || label)}</span>
        <span className="flex-shrink-0">
          {categoryKey === 'bodyPart' && (selectedBodyPart || label)}
        </span>
        <Image
          className="ml-1 rotate-[-90deg] mb-2"
          src="/assets/back.svg"
          alt="더보기"
          width={20}
          height={20}
          style={{
            filter: selected
              ? 'invert(29%) sepia(91%) saturate(7485%) hue-rotate(194deg) brightness(102%) contrast(101%)'
              : 'none',
          }}
        />
      </>
    )}
  </div>
);

export default CategoryItem;
