import React, { useEffect, useState } from 'react';
import { Box, Container, styled } from '@mui/material';
import Slide from './Slide';
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/userHandle';
import ProductsMenu from './customer/components/ProductsMenu';
import { NewtonsCradle } from '@uiball/loaders';
import { Link } from 'react-router-dom';
import { productDataList } from '../utils/products';

const Home = () => {
  const adURL =
    'https://img.freepik.com/free-photo/sale-word-with-row-filled-shopping-bags-yellow-background_23-2147892264.jpg?size=626&ext=jpg';
    const addUrl1='https://img.freepik.com/free-photo/mega-sale-retail-with-megaphone-podium_23-2149656622.jpg?ga=GA1.1.1216875717.1721876629&semt=ais_user'

  const dispatch = useDispatch();

  const { productData, responseProducts, error } = useSelector((state) => state.user);

  const [showNetworkError, setShowNetworkError] = useState(false);

console.log('====================================');
console.log(productDataList[0]);
console.log('====================================');
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setShowNetworkError(true);
      }, 40000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <div id="top">
      <Container
        sx={{
          display: 'none',
          '@media (max-width: 600px)': {
            display: 'flex',
          },
        }}
      >
        <ProductsMenu dropName="Categories" />
        <ProductsMenu dropName="Products" />
      </Container>
      <BannerBox>
        <Banner />
      </BannerBox>

      {showNetworkError ? (
        <StyledContainer>
          <h1>Sorry, network error.</h1>
        </StyledContainer>
      ) : error ? (
        <StyledContainer>
          <h1>Please Wait A Second</h1>
          <NewtonsCradle size={70} speed={1.4} color="black" />
        </StyledContainer>
      ) : (
        <>
          {responseProducts ? (
            <>
              <StyledContainer>No products found right now</StyledContainer>
              <StyledContainer>
                Become a seller to add products
                <Link to={"/Sellerregister"}>
                  Join
                </Link>
              </StyledContainer>
            </>
          ) : (
            <>
              <Component>
                <LeftComponent>
                  <Slide products={productDataList} title="Top Selection" />
                </LeftComponent>

                <RightComponent>
                  <img src={adURL} alt="" style={{ width: 217 }} />
                  <img src={addUrl1} alt="" style={{ width: 217 }} />
                </RightComponent>
              </Component>

              <Slide products={productDataList} title="Deals of the Day" />
              <Slide products={productDataList} title="Suggested Items" />
              <Slide products={productDataList} title="Discounts for You" />
              <Slide products={productDataList} title="Recommended Items" />
              <Slide products={productData} title="Products from Top Sellers" />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const BannerBox = styled(Box)`
  padding: 20px 10px;
  background: #F2F2F2;
`;

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
  width: '83%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const RightComponent = styled(Box)(({ theme }) => ({
  marginTop: 10,
  background: '#FFFFFF',
  width: '17%',
  marginLeft: 10,
  padding: 5,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
