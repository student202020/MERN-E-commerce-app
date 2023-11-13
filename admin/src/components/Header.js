import React from "react"
import styled from "styled-components";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

 const Header = () => {
    return(
        <Container>
            <Wrapper>
                <Left>
           Admin dashboard
                </Left>
           </Wrapper>
        </Container>
         
               
    )
}
export default Header