import './Layout.css'

export default function Layout({ children, headerRight }) {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Weather</h1>
        <div className="app__actions">{headerRight}</div>
      </header>
      <main className="app__main">{children}</main>
      <footer className="app__footer">Datos por OpenWeather</footer>
    </div>
  )
}


