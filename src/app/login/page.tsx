"use client"
import { signIn } from "next-auth/react"
// import { signIn } from "@/src/auth"
import { useState } from "react"
import { Box, Button, Center, Container, Field, Flex, Float, Grid, GridItem, Input, Text, } from "@chakra-ui/react"
import { PasswordInput } from "@/src/components/ui/password-input"
import { redirect } from "next/navigation"
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useAppDispatch } from "@/src/store/hooks"
import { setLoggedInUser } from "@/src/store/slices/globalSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({ email: false, pwd: false, invalidUser: false })
  const diapatch = useAppDispatch()
  const handleLogin = async (e: any) => {
    e.preventDefault()
    if (email && password) {
      let res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      })
      if (res?.error) {
        setError({ email: true, pwd: true, invalidUser: true })
      } else {
        diapatch(setLoggedInUser(email))
        redirect("/dashboard")
        //window.location.href = "/dashboard"
      }

    } else {
      let emailError = !email ? true : false;
      let pwdError = !password ? true : false;
      setError({ email: emailError, pwd: pwdError, invalidUser: false })
    }
  }

  return (
    <Box bg="#558f64" w="100%" minH="100dvh">
      <form onSubmit={handleLogin}>
        <Center minH="100dvh">
          <Box
            w="100%"
            maxW={{ base: "90%", md: "500px", lg: "600px" }}
            mx="auto"
            p={{ base: 4, md: 6 }}
            bg="white"
            borderRadius="xl"
            boxShadow="lg"
          >
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Field.Root invalid={error.email}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    type="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.email && (
                    <Field.ErrorText>This field is required</Field.ErrorText>
                  )}
                </Field.Root>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Field.Root invalid={error.pwd}>
                  <PasswordInput
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error.pwd && (
                    <Field.ErrorText>This field is required</Field.ErrorText>
                  )}
                </Field.Root>
              </GridItem>

              {error.invalidUser && (
                <GridItem textAlign="center" color="red.500">
                  Invalid email or password
                </GridItem>
              )}

              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Flex justify="flex-end">
                  <Button type="submit" rounded="2xl">
                    Login
                  </Button>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Text fontWeight={"bold"}>Do't have an accout?</Text> Click on <Link as={NextLink} href="/register" color="blue.500">
                  Sign Up
                </Link>
              </GridItem>
            </Grid>
          </Box>
        </Center>
      </form>
    </Box>
  )
}