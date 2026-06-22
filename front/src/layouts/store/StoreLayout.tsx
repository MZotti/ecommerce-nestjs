import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LightMode } from "@/components/chakra-ui/color-mode";
import { Toaster } from "@/components/chakra-ui/toaster";
import { useMe } from "@/hooks/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { authCreator, store } from "@/state";
import LoadingScreen from "./LoadingScreen";
import type { State } from "@/state/reducers";

const StoreLayout = () => {
	const { data, isFetching, isFetched } = useMe();
    const cart = useSelector(({ cart }: State) => cart)

	const dispatch = useDispatch()
	const { updateMeAction } = bindActionCreators(authCreator, dispatch)

	useEffect(() => {
		if (isFetched)
			updateMeAction(data)
	}, [data, isFetched])

	useEffect(() => {
		store.subscribe(() => {
			localStorage.setItem(
				'cart',
				JSON.stringify(store.getState().cart)
			);
		});
	}, [cart])

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
