import { skeleton } from '../../utils';

const Footer = ({
  content,
  loading,
}: {
  content: string | null;
  loading: boolean;
}) => {
  if (!content) return null;

  return (
    <div className="card-body py-6">
      {loading ? (
        skeleton({ widthCls: 'w-52', heightCls: 'h-6' })
      ) : (
        <div 
          className="text-sm text-base-content/70 transition-colors duration-300 hover:text-base-content"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      )}
    </div>
  );
};

export default Footer;
