import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type State = { failed: boolean };

export default class RouteErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {}

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="mx-auto flex min-h-[60svh] max-w-7xl flex-col items-start justify-center px-6 py-16">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="mt-3">This page could not load. Try again or return home.</p>
        <button type="button" onClick={() => this.setState({ failed: false })} className="mt-6 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase text-white">Try again</button>
        <Link to="/" className="mt-4 text-xs font-bold uppercase underline underline-offset-4">Home</Link>
      </main>
    );
  }
}
