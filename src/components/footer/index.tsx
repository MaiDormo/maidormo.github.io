const Footer = ({ content }: { content?: string }) => {
  if (!content) return null;

  return (
    <div className="mt-12 mb-8 flex justify-center w-full">
      <div
        className="text-xs font-mono text-base-content/40 hover:text-base-content/60 transition-colors duration-200 text-center"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Footer;
