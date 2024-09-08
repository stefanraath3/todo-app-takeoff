"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { CheckSquare, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <CheckSquare className="h-6 w-6 text-purple-400" />
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            FutureTasks
          </h1>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link
            href="/pricing"
            className="hover:text-purple-400 transition-colors"
          >
            Pricing
          </Link>
          <SignedIn>
            <Link
              href="/todo"
              className="hover:text-purple-400 transition-colors"
            >
              Todos
            </Link>
          </SignedIn>
        </nav>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-gray-100 hover:text-purple-400"
              >
                Login
              </Button>
            </SignInButton>
            <Link href="/signup">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900"
              >
                Join Now
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-gray-100 hover:text-purple-400"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="block hover:text-purple-400 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="block hover:text-purple-400 transition-colors"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
            </li>
            <SignedIn>
              <li>
                <Link
                  href="/todo"
                  className="block hover:text-purple-400 transition-colors"
                  onClick={toggleMenu}
                >
                  Todos
                </Link>
              </li>
            </SignedIn>
          </ul>
        </nav>
      )}
    </header>
  );
}
