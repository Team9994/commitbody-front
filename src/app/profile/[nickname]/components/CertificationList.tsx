import Image from 'next/image';

interface Certification {
  id: string;
  imageUrl: string;
}

interface CertificationListProps {
  certifications: Certification[];
}

const CertificationList: React.FC<CertificationListProps> = () => {
  const mock_certifications = [
    { id: '1', imageUrl: '/assets/heart_on.svg' },
    { id: '2', imageUrl: '/assets/heart_on.svg' },
    { id: '3', imageUrl: '/assets/heart_on.svg' },
    { id: '4', imageUrl: '/assets/heart_on.svg' },
    { id: '5', imageUrl: '/assets/heart_on.svg' },
  ];
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {mock_certifications.map((cert) => (
          <div key={cert.id} className="aspect-square relative">
            <Image
              src={'/assets/heart_on.svg'}
              alt="운동 인증"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationList;
