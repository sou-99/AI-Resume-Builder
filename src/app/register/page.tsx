"use client"

import { PasswordInput } from "@/src/components/ui/password-input"
import { Box, Button, Center, Field, Flex, Grid, GridItem, Input, Text } from "@chakra-ui/react"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState({ email: false, pwd: false, name: false })

  const handleRegister = async (e: any) => {
    e.preventDefault()
    if(!name){
      setError((prevState)=>({...prevState,name:true}))
      return;
    }else{
      setError((prevState)=>({...prevState,name:false}))
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setError((prevState)=>({...prevState,email:true}))
      return;
    }else{
      setError((prevState)=>({...prevState,email:false}))
    }
    if(password.trim().length<6){
      setError((prevState)=>({...prevState,pwd:true}))
      return;
    }else{
      setError((prevState)=>({...prevState,pwd:false}))
    }
    if (name && email && password) {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      })
      console.log("resp=", response)
      if (response?.status !== 200) {
        setError({ email: true, pwd: true, name: true })
      } else if (response?.status === 200) {
        setError({ email: false, pwd: false, name: false })
        redirect("/login")
      }
    }
  }

  return (
    <Box bg="#558f64" w="100%" minH="100dvh">
      <form onSubmit={handleRegister}>
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
              <Text color={'red.600'}>All fields are required.</Text>
            </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Field.Root invalid={error.name}>
                  <Field.Label>Name</Field.Label>
                  <Input
                    value={name}
                    placeholder="name"
                    onChange={(e) => {if(/^[^0-9]*$/.test(e.target.value)){
                      console.log("yyyyy")
                      setName(e.target.value)
                    }}}
                  />
                  {error.name && (
                    <Field.ErrorText>Please enter valid details</Field.ErrorText>
                    )}
                </Field.Root>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Field.Root invalid={error.email}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.email && (
                    <Field.ErrorText>Please enter valid details</Field.ErrorText>
                  )}
                </Field.Root>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Field.Root invalid={error.pwd}>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error.pwd && (
                    <Field.ErrorText>Please enter valid details</Field.ErrorText>)}
                </Field.Root>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Flex justify="flex-end">
                  <Button type="submit" rounded="2xl">
                    Sign Up
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Center>
      </form>
    </Box>
  )
}