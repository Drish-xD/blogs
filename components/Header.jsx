import React, { useContext } from "react";
import Link from "next/link";

const categories = [
  { name: "react", slug: "react" },
  { name: "Web Development", slug: "web-dev" },
];

const Header = () => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="border-b w-full inline-block border-b-purple-500 py-8">
        <div className="md:float-left block">
          <Link href="/" passHref>
            <span className="cursor-pointer text-4xl font-bold text-white">
              Blogs
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link
              href={`/category/${category.slug}`}
              key={category.slug}
              passHref
            >
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
