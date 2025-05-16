import { Box, Flex, Heading } from "@radix-ui/themes";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink } from "react-router-dom";

const menu = [
    {
        title: "Uploader",
        link: "/upload",
    },
    {
        title: "History",
        link: "/history",
    },
];

export function Header() {
    return (
        <>
            <Flex
                position="sticky"
                px="4"
                py="2"
                justify="between"
                style={{
                    // borderBottom: "1px solid var(--gray-a2)",
                }}
            >
                <Box>
                    <Heading>MultiChainWalrus</Heading>
                </Box>

                <Box className="flex gap-5 items-center">
                    {menu.map((item) => (
                        <NavLink
                            key={item.link}
                            to={item.link}
                            className={({ isActive, isPending }) =>
                                `cursor-pointer flex items-center gap-2 ${isPending
                                    ? "pending"
                                    : isActive
                                        ? "font-bold text-blue-600"
                                        : ""
                                }`
                            }
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </Box>

                <Box>
                    <ConnectButton connectText="Connect Wallet" accountStatus="avatar"
                    />
                </Box>
            </Flex>
        </>
    )
}