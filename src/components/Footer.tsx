function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer footer-center bg-gray-700 p-10 text-primary-content">
      <p>Copyright &copy; {footerYear} All rights reserved</p>
    </footer>
  );
}

export default Footer;
