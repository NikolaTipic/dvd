import { StyledTitle, StyledSubtitle, Avatar, StyledButton, ButtonGroup } from "./../components/Styles";

//Logo
import Logo from "./../assets/availLogo5.png";
import { MdAlignHorizontalCenter } from "react-icons/md";

const Home = () => {
    return (
        
        <div>
            <div 
              style={{
                marginBottom: "5%"
              }}>
                <Avatar image={Logo}/>
            </div>
            
                <StyledTitle size={65}>
                    Dobrodošli u e - DVD
                </StyledTitle>
                <StyledSubtitle size={27}>
                    Prijavi se za nastavak do e - Dežurnog
                </StyledSubtitle>

                <ButtonGroup>
                    <StyledButton to="/login">Login</StyledButton>
                    <StyledButton to="/signup">Signup</StyledButton>
                </ButtonGroup>

                
                <StyledSubtitle style={{
                    position: "fixed",
                    top: "95%",
                    left: "50%",
                    transform: "translatex(-50%)"
                }}>
                    Donirao Cro-bit d.o.o. - hotel Krilo
                </StyledSubtitle>
                
                
            
        </div>
    );
}

export default Home;