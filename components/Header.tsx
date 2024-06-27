import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full flex items-center gap-10 px-20 bg-white h-12">
      <Link href="/" className="text-xl font-black">
        Pixel Magic
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Who are we?</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gray-200 p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Zubedi group
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Built by a team of experts. Hope you enjoy it.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <h3 className="text-lg font-medium">Our other projects</h3>
                <ListItem href="/kenroz" title="Kenroz">
                  Kenroz is a school management system that helps schools
                  automate their processes and track fees, attendance, and more.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 max-w-[300px] md:w-[400px] lg:w-[500px]">
                <ListItem href="/blur-image" title="Blur Image">
                  Easily apply a blur effect to any part of your image.
                </ListItem>
                <ListItem href="/convert-image" title="Convert Image">
                  Convert your images to and from various formats effortlessly.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;

const ListItem = ({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gray-200 p-4 no-underline outline-none focus:shadow-md"
          href={href}
        >
          <div className="mb-2 mt-4 text-lg font-medium">{title}</div>
          <p className="text-sm leading-tight text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
