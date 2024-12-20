import Image from 'next/image';
import Link from 'next/link';

export interface Certification {
  articleId: string;
  imageUrl: string;
}

interface CertificationListProps {
  certifications: Certification[];
}

const CertificationList = ({ certifications }: CertificationListProps) => {
  console.log(certifications);
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {certifications?.map((cert) => (
          <Link key={cert?.articleId} href={`/community/${cert?.articleId}?type=certification`}>
            <div
              className="aspect-square relative cursor-pointer"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1',
                objectFit: 'cover',
              }}
            >
              <Image src={cert?.imageUrl} alt="운동 인증" fill />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CertificationList;
