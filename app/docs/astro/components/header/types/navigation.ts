import { ReactNode } from "react";

export type SubItem = {
  label:        string;
  href:         string;
  description?: string;
};

export type MenuItemProps = {
  href:      string;
  label:     string;
  subItems?: SubItem[];
};

export type LandingHeaderProps = {
  logoComponent?:  React.ReactElement;
  children:        ReactNode;
  withBackground?: boolean;
  variant?:        "primary" | "secondary";
};

export type MobileDrawerProps = {
  items:   React.ReactElement[];
  onClose: () => void;
};

export type HamburgerButtonProps = {
  isDark:  boolean;
  onClick: () => void;
};
