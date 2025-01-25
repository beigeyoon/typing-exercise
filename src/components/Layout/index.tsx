import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <header style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>
        <nav>
          <ul style={{ display: 'flex', gap: '10px', listStyle: 'none' }}>
            <li>
              <a href="/">홈</a>
            </li>
            <li>
              <a href="/short">짧은 연습</a>
            </li>
            <li>
              <a href="/long">긴 연습</a>
            </li>
          </ul>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
      <footer
        style={{
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#f1f1f1',
        }}>
        <p>© 2025 Typing Exercise App</p>
      </footer>
    </div>
  );
}
