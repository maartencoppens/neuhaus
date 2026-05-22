import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import Container from "./Container";

const Navbar = () => {
  return (
    <div className="bg-background-secondary w-full text-text-sm">
      <Container>
        <header className="flex justify-between items-center py-md">
          <Logo />
          <nav>
            <ul className="flex gap-4 p-4">
              <li>
                <a href="/" className="text-[#2b160e] hover:text-[#5c4a38]">
                  Home
                </a>
              </li>
              <li>
                <a href="/chat" className="text-[#2b160e] hover:text-[#5c4a38]">
                  Chat
                </a>
              </li>
              <li>
                <a href="/box" className="text-[#2b160e] hover:text-[#5c4a38]">
                  Box Overview
                </a>
              </li>
              <li>
                <a
                  href="/checkout"
                  className="text-[#2b160e] hover:text-[#5c4a38]"
                >
                  Checkout
                </a>
              </li>
            </ul>
          </nav>
          <Button label="Explore your taste" link="/chat" />
        </header>
      </Container>
    </div>
  );
};

export default Navbar;
