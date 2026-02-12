//Componente estatico header
export default function Header({ children }) {
  return (
    <header style={{background:'#0077cc', color:'#fff', padding:'1.5em 0 1.5em 0', textAlign:'center', marginBottom:'0', position:'relative'}}>
      <h1 style={{margin:0, fontSize:'2.2em', letterSpacing:'2px'}}>Bolera React</h1>
      {children}
    </header>
  );
}
