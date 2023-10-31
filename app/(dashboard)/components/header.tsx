interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function AdminHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-bold text-3xl md:text-4xl">{heading}</h1>
        {text && (
          <p className="text-lg text-foreground">
            Welcome to you dashboard, <span className="font-bold">{text}</span>
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
