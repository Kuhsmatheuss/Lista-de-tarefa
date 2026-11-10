import './globals.css';

export const metadata = {
  title: 'Organizaê | Lista de tarefas',
  description: 'Organize suas tarefas de forma simples e prática.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
