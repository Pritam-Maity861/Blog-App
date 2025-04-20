import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-6 mt-6 text-center text-gray-600">
      <div className="max-w-6xl mx-auto">
        <ul className="flex justify-center gap-4 mb-4">
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Terms</a></li>
          <li><a href="#" className="hover:underline">Privacy</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
        <p>© {new Date().getFullYear()} Medium Clone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
