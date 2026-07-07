import { ReactNode } from "react";

export type CodePreviewProps = {
  root:    string;
  html:    string;
  css:     string;
  js:      string;
  preview: ReactNode;
};

export type Example = {
  title:       string;
  description: string;
  code:        Omit<CodePreviewProps, "preview">;
  preview:     ReactNode;
};

export type TabButtonProps = {
  tab:      string;
  isActive: boolean;
  onClick:  () => void;
};

export type CopyButtonProps = {
  copied:   boolean;
  onClick:  () => void;
  compact?: boolean;
};

export type BadgeProps = {
  children: ReactNode;
  color?:   string;
};
