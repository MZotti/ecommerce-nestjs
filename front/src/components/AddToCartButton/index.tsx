import type Product from '@/interfaces/product'
import { cartCreator } from '@/state';
import type { State } from '@/state/reducers';
import { Button } from '@chakra-ui/react';
import { CheckCircleIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

const AddToCartButton = ({ product, quantity = 1 }: { product: Product, quantity?: number }) => {
    const cart = useSelector(({ cart }: State) => cart)
    const dispatch = useDispatch()
    const { addToCartAction, increaseProductAction } = bindActionCreators(cartCreator, dispatch)

    const [click, setClick] = useState<boolean>(false);

    const addProductToCart = () => {
        if (click)
            return;

        if (cart.find(item => item.productId === product.id) === undefined) {
            addToCartAction({
                productId: product.id,
                productName: product.name,
                productImageUrl: product.imageUrl,
                price: product.price,
                quantity
            })
        } else {
            increaseProductAction({
                productId: product.id,
                quantity
            })

        }
        setClick(true);
    }

    return (
        <Button variant={!click ? "solid" : "surface"} w="full" colorPalette={!click ? "orange" : "green"} colorScheme="light" onClick={addProductToCart}>
            {
                !click ? <><ShoppingCartIcon size="14px" /> Add to cart</>
                    : <><CheckCircleIcon size="14px" weight="bold" />Product added to cart</>
            }

        </Button>
    )
}

export default AddToCartButton