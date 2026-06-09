import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import Account from "./Account";
import Categories from "./Categories";

export const Header = () => {
	return (
		<>
			<Flex as="nav" p="4" bg="orange.500" justify="space-between" align="center" px="400px">
				<Link to="/">
					<Text color="white" fontWeight="bold" fontSize="xl">Ecommerce Shop</Text>
				</Link>
				<Flex gap="4">
					<Account />
					<Cart />
				</Flex>
			</Flex>
			<Flex as="nav" p="4" bg="orange.600" justify="space-between" align="center" px="400px">
				<Categories />
			</Flex>
		</>
	);
};
