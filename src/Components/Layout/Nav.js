import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/theiautoLogoWhite.png';
import SubScribeBtn from '../Features/SubScribeButton/SubScribeBtn';
import { NavContainer, NavInnerBox } from './Nav.style';

function Nav() {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <NavInnerBox>
        <img src={logo} alt='logo' className='main-logo' onClick={() => navigate('/')} />
        <div style={{ border: '3px solid white', width: '500px', height: '72px' }}></div>
        <SubScribeBtn />
      </NavInnerBox>
    </NavContainer>
  )

}

export default Nav;