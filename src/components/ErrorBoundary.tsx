import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="text-center font-mono">
            <h1 className="text-4xl font-bold text-emerald-500 mb-4">
              SYS_FAULT
            </h1>
            <p className="text-zinc-400 mb-6">
              Something went wrong rendering this section.
            </p>
            <a
              href="/"
              className="text-emerald-500 hover:text-emerald-400 underline"
            >
              Reload page
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
