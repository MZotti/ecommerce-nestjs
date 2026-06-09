import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
	return (
		<Box as="footer" p="4" bg="gray.800" color="white" textAlign="center" mt="auto">
			<Text>&copy; {new Date().getFullYear()} Ecommerce Shop. All rights reserved.</Text>
		</Box>
	);
};
