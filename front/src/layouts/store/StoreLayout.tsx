import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LightMode } from "@/components/chakra-ui/color-mode";
import { Toaster } from "@/components/chakra-ui/toaster";
import { useMe } from "@/hooks/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authCreator } from "@/state";
import LoadingScreen from "./LoadingScreen";

const StoreLayout = () => {
	const { data, isFetching, isFetched } = useMe();

	const dispatch = useDispatch()
	const { updateMeAction } = bindActionCreators(authCreator, dispatch)

	useEffect(() => {
		if (isFetched)
			updateMeAction(data)
	}, [data, isFetched])

	if (isFetching)
		return <LoadingScreen />

	return (
		<LightMode>
			<Flex direction="column" minH="100vh" backgroundColor="gray.100">
				<Header />
				<Box as="main" flex="1" py="4">
					<Outlet />
				</Box>
				<Footer />
			</Flex>
			<Toaster />
		</LightMode>
	);
};

export default StoreLayout;
