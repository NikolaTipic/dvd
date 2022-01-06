import { StyledTitle, Avatar, StyledButton, ButtonGroup,
         StyledFormArea, ExtraText, StyledSubtitle
} from "./../components/Styles";

//Logo
import Logo from "./../assets/availLogo5.png";
import LogoDVD from "./../assets/dvd_logo.jpg"

//auth & redux
import { connect } from "react-redux";
import { getAvailableFiremans, logoutUser } from "./../auth/actions/userAction";

//React router
import { useHistory } from "react-router-dom";

//
import { useState, useEffect } from "react";

//Scrollbar
import { Scrollbars } from 'react-custom-scrollbars';

//Icons
import { MdOutlineCheckCircleOutline } from "react-icons/md"
import { DiCodeigniter } from "react-icons/di";




const Dashboard = ({logoutUser, user}) => {
    const history = useHistory();
    const [list, setList] = useState([]);

    function myMethod() {
        getAvailableFiremans(setList)
    }

    useEffect(() => {

        getAvailableFiremans(setList);
        
        setInterval(myMethod, 3000); 
        
    }, [history]);

    const listOfAvailableFireman = list.map((fireman, index) =>
        <div key={index} style={{
            display: "flex",
            border: "1px solid #fff",
            borderRadius: "10px",
            margin: "1%",
            marginLeft: "2%",
            marginRight: "2%",
            backgroundColor: "#2EB67D",
            
            }}>
                
            <div style= {{ marginLeft: "5%" }}>
                <DiCodeigniter size="30" style= {{ paddingTop: "25%", marginLeft: "5%"}} />
            </div>
            
            <ExtraText key={index} firemanLi={true}>{fireman}</ExtraText>

            <div>
                <MdOutlineCheckCircleOutline size="30" style= {{ marginTop: "0.9%", position: "absolute", right: "10%" }}/>
            </div>
            
        </div>
    )

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%"
        }}>
            <div style={{
            margin: "2.5%",
            width: "40%",
            
            }}>

                <StyledFormArea style={{backgroundColor: "transparent", border: "1px solid #fff"}}>
                    <StyledTitle size={25}>
                        Dobrodošao, {user.name}
                    </StyledTitle>

                    <Avatar logo2={true} image={LogoDVD} 
                        style={{
                            marginTop: "5%",
                            marginBottom: "5%"
                        }}
                    />

                     
                </StyledFormArea>

                <ButtonGroup style={{marginTop: "40%"}}>
                        <StyledButton to="#" onClick={() => logoutUser(history)}>Logout</StyledButton>
                </ButtonGroup>  
                

            </div>
            <div style={{
                width: "100%",
                borderRadius: "15px",
                margin: "2.5%",
            }}>    
                
                <Scrollbars style={{ width: "70%", height: 600, color: "#fff", marginLeft: "20%" }}>
                    {listOfAvailableFireman}
                </Scrollbars>
                
                

            </div>

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

const mapStateToProps = ({session}) => ({
    user: session.user
})

export default connect(mapStateToProps, {logoutUser})(Dashboard);