import Logo from './Logo';
import Search from './Search';

export default function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-muted-foreground">
      <Logo />
      <Search />
    </div>
  );
}
