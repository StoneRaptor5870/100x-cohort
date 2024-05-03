import { useRecoilValue } from 'recoil';
import { userAtom } from './atoms';
import UsernameInput from './UsernameInput';
import Card from './Card';

export default function GithubProfile() {
  const user = useRecoilValue(userAtom);
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen '>
      {user ? <Card user={user} /> : <UsernameInput />}
    </div>
  );
}