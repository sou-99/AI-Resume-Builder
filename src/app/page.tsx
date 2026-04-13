//https://nextjs.org/docs/messages/middleware-to-proxy; 
// Server Component
'use client'
import Link from "next/link";
import { Button, Text } from "@chakra-ui/react"
import { redirect } from "next/navigation"
import { Container } from "@chakra-ui/react"
import { Flex, Box } from "@chakra-ui/react"
import Image from "next/image";
import { Avatar, Blockquote, Float, HStack, Span } from "@chakra-ui/react"
import {persistor} from '../store/store'
export default function Homestart() {

  return (
    <Box bg={'#558f64'} p={0} m={0} w={'100%'} minH={'100dvh'}>
      <Container>
        <Flex gap={{base:6, md: 10, lg: 20 }} direction={{ base: "column", lg: "row" }}>
          <Box paddingTop={{base:10,lg:40}}>
            <Blockquote.Root bg="bg.subtle" padding="8" colorPalette="red">
              <Float placement="bottom-end" offset="10">
                <Blockquote.Icon opacity="0.4" boxSize="10" rotate="180deg" />
              </Float>
              <Blockquote.Content cite="Uzumaki Naruto">
                ResumeGenius is an intelligent AI-powered resume builder designed to help job seekers to create professional, impactful resumes in minutes. Leveraging advanced artificial intelligence, the platform analyzes user input and generates tailored resumes that align with industry standards and job requirements.
              </Blockquote.Content>
              <Blockquote.Caption>
                <cite>
                  <HStack mt="2" gap="3">
                    <Avatar.Root size="sm">
                      <Avatar.Fallback name="Emily Jones" />
                      <Avatar.Image src='/images/soumya-avatar.png' />
                    </Avatar.Root>
                    <Span fontWeight="medium">Soumyaranjan</Span>
                  </HStack>
                </cite>
                <Button
                  onClick={() =>
                    redirect("/login")
                  }
                  marginTop={8}
                  colorPalette={'purple'}
                >
                  Get Started
                </Button>
              </Blockquote.Caption>
            </Blockquote.Root>
          </Box>
          <Box
            h={{ base: "auto", lg: "12rem" }}
            w={{ base: "100%", lg: "65rem" }}
            p={{ base: 4, lg: 8 }}
          >
            <Image
              alt="sample resume"
              src="/images/resume-sample.png"
              width={300}
              height={300}
              className="w-full h-auto rotate-6"
            />
          </Box>
        </Flex>
      </Container>
    </Box>)
}
persistor.purge();