import { userLogo } from '../assets/icons';

function Navbar() {
  return (
    <nav className="max-width flex items-center justify-between gap-2 py-7">
      <h1 className="text-[1.5rem] font-bold">Task Board</h1>
      <div className="flex size-12 items-center justify-center rounded-full bg-white">
        <img src={userLogo} alt="user icon" className="w-[24px]" />
      </div>
    </nav>
  );
}

export default Navbar;
