import Header from './components/Header/Header';
import UserList from './components/Users/UserList';
import UserProfile from './components/Users/UserProfile';

function App() {
  return (
    <div className="h-full">
      <Header />
      <div className="flex flex-col sm:flex-row">
        <UserList />
        <UserProfile />
      </div>
    </div>
  );
}

export default App;
