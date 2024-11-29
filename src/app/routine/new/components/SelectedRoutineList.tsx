import Image from 'next/image';

const SelectedRoutineList = ({ routines }: { routines: [] }) => {
  return (
    <div
      className="bg-backgrounds-default w-full overflow-y-scroll"
      style={{ height: 'calc(100vh - 148px - 20px)' }}
    >
      {routines.map((list: any) => (
        <div
          key={list.id}
          className={`flex items-center w-full h-[76px] border-b border-backgrounds-default cursor-pointer pr-6 `}
        >
          <Image src={list.image} alt={list.name} width={76} height={76} />
          <span className="flex-1 ml-4">{list.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SelectedRoutineList;
