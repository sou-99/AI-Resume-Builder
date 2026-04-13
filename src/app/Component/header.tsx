'use client'

import { Box } from "@chakra-ui/react"
import Image from "next/image"
const Header = () => {
    return (
        <Box bg={"blue.200"} h={"4rem"} p={2} w={"100%"}>
        {/* <Logo/> */}
        <Image alt="resume with AI" src='/images/logo2.jpg' width={'800'} height={'1000'} className="w-40 h-40" />
      </Box>
    )
}
export default Header;