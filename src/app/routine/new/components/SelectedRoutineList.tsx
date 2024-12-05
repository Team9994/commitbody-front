import Image from 'next/image';

const SelectedRoutineList = ({ routines }: { routines: [] }) => {
  console.log(routines);
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
          <Image src={list.gif} alt={list.name} width={76} height={76} />
          <span className="flex-1 ml-4">{list.name}</span>
        </div>
      ))}
      {routines.length === 0 && (
        <div className="flex justify-center items-center mt-40">
          <p className=" text-text-light text-md text-center">
            +버튼을 눌러 <br />
            새로운 운동을 추가해보세요
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectedRoutineList;
