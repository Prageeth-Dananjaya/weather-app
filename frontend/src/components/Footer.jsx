const Footer = () => {
  return (
    <footer className="text-white backdrop-blur-md bg-gray-700 py-4 mt-10 shadow-inner">
      <div className="mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} Fidenz Technologies</p>
      </div>
    </footer>
  );
};

export default Footer;
