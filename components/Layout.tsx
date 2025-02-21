import { ComponentChildren } from "preact";
import * as Text from "../components/Text.tsx";
import Button, { ButtonProps } from "../components/Button.tsx";

const SCREEN_COLOUR = "bg-black";
const ELEMENT_COLOUR = "bg-gray-800";
const ELEMENT_SIZE = "max-w-screen-md";
const TEXT_COLOUR = "text-white";

interface ChildrenProps {
  children: ComponentChildren;
}

interface PageProps {
  colour?: string;
  children: ComponentChildren;
  disableFooter?: boolean;
  footerProps?: FooterProps;
  enableHeader?: boolean;
  headerProps?: HeaderProps;
}

export function Page({
  colour = SCREEN_COLOUR,
  children,
  disableFooter = false,
  footerProps = {},
  enableHeader = false,
  headerProps = {},
}: PageProps) {
  return (
    <div class={`flex flex-col min-h-screen ${colour}`}>
      {enableHeader ? <Header {...headerProps} /> : null}
      <div class="flex-grow flex items-center justify-center mb-9 px-4 sm:px-8 pt-8 pb-8">
        {children}
      </div>
      {disableFooter ? null : <Footer {...footerProps} />}
    </div>
  );
}

interface ElementProps {
  children: ComponentChildren;
  title?: string;
  colour?: string;
  textColour?: string;
  size?: string;
}

export function Element({
  title = "",
  colour = ELEMENT_COLOUR,
  textColour = TEXT_COLOUR,
  size = ELEMENT_SIZE,
  children,
}: ElementProps) {
  return (
    <div
      class={`px-8 py-8 mx-auto my-auto ${colour} rounded-2xl w-full ${size}`}
    >
      <Center>
        <Text.Title textColour={textColour}>{title}</Text.Title>
        <br />
        {children}
        <br />
      </Center>
    </div>
  );
}

interface GridProps {
  customGridCols?: string;
  children: ComponentChildren;
}

export function Grid({ customGridCols, children }: GridProps) {
  if (!customGridCols) {
    const childCount = Array.isArray(children) ? children.length : 1;
    const gridCols =
      childCount <= 2
        ? `grid-cols-${childCount}`
        : "grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    customGridCols = gridCols;
  }

  return <div class={`grid ${customGridCols} gap-4 mt-4 mb-4`}>{children}</div>;
}

export function Center({ children }: ChildrenProps) {
  return (
    <div class="flex flex-col items-center px-4 py-4 sm:px-8">{children}</div>
  );
}

interface HeaderProps {
  title?: string;
  colour?: string;
  textColour?: string;
}

export function Header({
  title = "",
  colour = "bg-gray-900",
  textColour,
}: HeaderProps) {
  return (
    <header class={`flex flex-col items-center w-auto py-2 ${colour} text-white`}>
      <Text.Heading textColour={textColour}>{title}</Text.Heading>
    </header>
  );
}

interface FooterProps {
  colour?: string;
  textColour?: string;
  disableButton?: boolean;
  buttonProps?: ButtonProps;
  authorProps?: AuthorProps;
  isBeta?: boolean;
}

interface AuthorProps {
  name?: string;
  link?: string;
}

export function Footer({
  colour = "bg-gray-900",
  textColour = "text-white",
  disableButton = false,
  buttonProps = {
    href: "/",
    text: "Home",
  },
  authorProps = {
    name: "Author",
    link: "/",
  },
  isBeta = true,
}: FooterProps) {
  return (
    <>
      <footer
        class={`flex flex-col items-center w-auto ${colour} ${textColour}`}
      >
        {!disableButton && <Button {...buttonProps} />}
        <div class="flex flex-col md:flex-row justify-center items-center h-auto md:h-16 p-4 md:p-2 pb-16 md:pb-2">
          {isBeta ? (
            <>
              <p class="text-yellow-500 mb-2 md:mb-0">
                This website is in beta.
              </p>
              <p class="hidden md:block mx-2">|</p>
            </>
          ) : null}
          <p class="mb-2 md:mb-0">
            Made with ❤️ by{" "}
            <a href={authorProps.link} class="text-blue-500 hover:underline">
              {authorProps.name}
            </a>
          </p>
          <p class="hidden md:block mx-2">|</p>
          <p>
            &copy; {authorProps.name} {new Date().getFullYear()}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
