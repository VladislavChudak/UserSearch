import Logo from './Logo';
import Search from './Search';

export default function Header() {
  return (
    <div className="flex justify-between p-4">
      <Logo />
      <Search />
    </div>
  );
}
