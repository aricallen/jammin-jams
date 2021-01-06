import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { useHistory } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../../redux/cart/actions';
import { isResolved } from '../../../utils/meta-status';
import { Spinner, Content, MobileOnly, Button } from '../../common';
import { CartPreview } from './CartPreview';
import { ProductItem } from './ProductItem';
import { fetchProducts } from '../../../redux/products/actions';
import { media } from '../../../utils/media';
import { fontSizes } from '../../../utils/style-helpers';
import { spacing, pallet } from '../../../constants/style-guide';

const Wrapper = styled('div')``;

const ListWrapper = styled('div')`
  ${media.desktop()} {
    display: grid;
    grid-template-columns: ${(p) => (p.hasItems ? '3fr 1fr' : 'auto')};
  }
`;

// only for mobile
const FloatingButton = styled('div')`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: ${spacing.double}px;
  padding-bottom: ${spacing.double}px;
  z-index: 2;
  background-color: ${pallet.strawberry};
  opacity: 0;
  animation: fade-in 0.3s 1;
  &.in-view {
    opacity: 1;
  }
  & button {
    width: 80%;
  }
`;

const ItemWrapper = styled('div')`
  padding: ${spacing.quadruple}px;
  padding-top: 0;
  width: 30%;
  ${media.mobile()} {
    width: 100%;
  }
`;

const List = styled(Content)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 0;
`;

const Img = styled('img')`
  width: 100%;
  object-fit: cover;
`;

const Top = styled('div')`
  display: flex;
  justify-content: center;
  position: relative;
`;

const TopContent = styled('div')`
  width: 50%;
  ${media.mobile()} {
    width: 100%;
  }
`;

const OrgLinkWrapper = styled('div')`
  padding: ${spacing.quadruple * 3}px;
  padding-top: ${spacing.double}px;
  ${media.mobile()} {
    padding: 16px;
  }
`;

const Credit = styled('div')`
  font-size: ${fontSizes('small')};
  font-style: italic;
`;

const TextWrapper = styled('div')`
  ${media.mobile()} {
    margin: auto;
    width: 80%;
  }
`;

const TextBlock = styled('p')`
  margin-top: ${spacing.double}px;
  text-align: justify;
`;

const Bold = styled('b')`
  color: ${pallet.strawberry};
`;

const Counter = styled('span')`
  display: inline-block;
  border-radius: 50%;
  background: ${pallet.strawberry};
  color: ${pallet.background};
  margin-left: ${spacing.regular}px;
  padding: 2px 6px;
`;

const Bottom = styled('div')``;

export const Store = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ref, inView] = useInView();
  const productsState = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.data);
  const hasItems = cart.length > 0;
  const showFloatingCheckout = hasItems && inView;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const onAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const onRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const onCheckout = () => {
    history.push({ pathname: '/store/checkout' });
  };

  if (!isResolved(productsState.meta)) {
    return <Spinner variant="large" />;
  }

  const totalItems = cart.reduce((total, curr) => total + curr.selectedQty, 0);

  return (
    <Wrapper>
      <Top>
        <MobileOnly>
          {hasItems && (
            <FloatingButton
              inView={inView}
              className={showFloatingCheckout ? 'in-view' : 'not-in-view'}
            >
              <Button onClick={onCheckout} variant="secondary">
                Checkout <Counter>{totalItems}</Counter>
              </Button>
            </FloatingButton>
          )}
        </MobileOnly>
        <TopContent>
          <Img src="/assets/uploads/large/cantaloupe.jpeg" />
          <TextWrapper>
            <Credit>
              Art by Shireen Tofig{' '}
              <a
                href="https://www.instagram.com/lesbaobabs"
                target="_blank"
                rel="noopener noreferrer"
              >
                @lesbaobabs
              </a>
            </Credit>
            <TextBlock>Dear Friends,</TextBlock>

            <TextBlock>
              For the whole month of July we are donating 100% of our sales to{' '}
              <a
                href="https://artogether.givingfuel.com/inunison"
                target="_blank"
                rel="noopener noreferrer"
              >
                ARTogether&apos;s #InUnison campaign!
              </a>
            </TextBlock>

            <TextBlock>
              ARTogether is leading a community engagement initiative in the East Oakland
              neighborhoods that will bring together people of refugees, Latinx, Black and LGBTQIA
              backgrounds to{' '}
              <Bold>connect through shared values and common challenges through Art</Bold>.
            </TextBlock>

            <TextBlock>
              Many immigrant communities have traditionally not been very vocal about protecting
              other minority groups. The same systems of oppression and fear that marginalize Black
              communities also contributed to developing a lack of interaction and trust among all
              individuals. But we are changing that. Jam sales will be contributing to creating a
              safe space, facilitated by trauma-informed healthcare professionals, community
              leaders, and art practitioners for discussing inter sectional issues including
              displacement and gentrification; police, military and ICE brutality; access to health
              care; economic disparity; overt and covert racism; and misinformation and prejudice
              between communities of color.
            </TextBlock>
            <TextBlock>
              Click on the link below or visit{' '}
              <a href="https://artogether.org" target="_blank" rel="noopener noreferrer">
                artogether.org
              </a>{' '}
              to learn more.
            </TextBlock>
          </TextWrapper>
          <OrgLinkWrapper>
            <a href="https://artogether.org" target="_blank" rel="noopener noreferrer">
              <Img src="/assets/uploads/medium/artogether.png" />
            </a>
          </OrgLinkWrapper>
        </TopContent>
      </Top>
      <Bottom ref={ref}>
        <ListWrapper hasItems={hasItems}>
          <List>
            {productsState.data.map((product) => (
              <ItemWrapper key={product.id}>
                <ProductItem product={product} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
              </ItemWrapper>
            ))}
          </List>
          <CartPreview onCheckout={onCheckout} />
        </ListWrapper>
      </Bottom>
    </Wrapper>
  );
};
