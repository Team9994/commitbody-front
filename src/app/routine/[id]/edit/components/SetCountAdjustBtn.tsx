import Image from 'next/image';

interface SetCountAdjustBtnProps {
  type: 'add' | 'delete';
  onClick: () => void;
}

const SetCountAdjustBtn = ({ type, onClick }: SetCountAdjustBtnProps) => {
  return (
    <div className="flex items-center gap-2 rounded-6 border-backgrounds-light border px-9 py-2">
      <Image
        src={type === 'add' ? '/assets/plus.svg' : '/assets/minus_tight.svg'}
        alt="plus"
        width={24}
        height={24}
        className="p-1"
      />
      <span>세트 {type === 'add' ? '추가' : '삭제'}</span>
    </div>
  );
};

export default SetCountAdjustBtn;
