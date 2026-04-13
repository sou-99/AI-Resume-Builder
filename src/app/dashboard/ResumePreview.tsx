'use client'

import { useAppSelector } from "@/src/store/hooks";
import { Box, Button, ColorSwatch, Grid, GridItem, HStack, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { useReactToPrint } from "react-to-print";

const ResumePreview = () => {
    const { name, email, phone, role, location } = useAppSelector((state) => state.personalInfo)
    const { summary } = useAppSelector((state) => state.summarySlice)
    const { skills } = useAppSelector((state) => state.skillSlice)
    const { experience } = useAppSelector((state) => state.experienceSlice)
    const { education, university, from, to, cgpa, error, educations, languages } = useAppSelector((state) => state.educationSlice)
    let expFlag = experience.some((exp) => Object.values(exp).every((v) => v !== "" && v !== undefined))
    const componentRef = useRef(null);
    const isMobile = useBreakpointValue({ base: true, lg: false });

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: "Resume",
        pageStyle: `
    @page {
      size: A4;
      margin: 15mm;
    //   page-break-before: always;
    // margin-top: 20mm; /* 🔥 forces spacing on new page */
    // margin-bottom: 20mm;
    // padding-top: 20mm;
    // padding-bottom:20mm;
    }

    @media print {
      body {
        margin: 0;
        padding: 0;
      }
    }

    /* 🔥 Force color printing */
      * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .no-print {
        display: none;
      }
  `,
    });

    return (
        <Box
            w={isMobile?"100%":"1/2"}
            height="297mm"
            m={5} p={2}
            bg={'white'}
            boxShadow="lg"
            borderRadius={'sm'}
            overflowY={'scroll'}
        >
            {educations.length > 0 && languages.length > 0 && <Box
                position="sticky"
                top="0"
                zIndex="10"
                bg="none"
                py={2}
                px={4}
                display="flex"
            >
                <Button colorScheme="green" ml="auto" onClick={() => handlePrint()}>
                    Download Resume
                </Button>
            </Box>}
            <Box m={10} ref={componentRef}>
                <Grid templateColumns="repeat(1, 1fr)" gap={0.7}>
                    <GridItem colSpan={1}>
                        <Text fontWeight={'bold'}>{name.toUpperCase()}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text>{role}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <HStack>
                            {location && <Icon as={MdLocationOn} color="red.500" />}
                            <Text>{location}{location && " | "}</Text>
                            {phone && <Icon as={FaPhoneAlt} boxSize={4} color="blue.500" />}
                            <Text>{phone} {phone && " | "}</Text>
                            {email && <Icon as={MdEmail} boxSize={5} color="red.500" />}
                            <Text>{email && ` ${email}`}</Text>
                        </HStack>
                    </GridItem>
                    {name && role && location && phone && email && <GridItem>
                        <Box height="3px" bg="gray.500" my={3} boxShadow={'lg'} />
                    </GridItem>}
                    {summary &&
                        <GridItem colSpan={1}>
                            <Heading size="lg" mb={3}>PROFESSIONAL SUMMARY</Heading>
                            <Box>{summary}</Box>
                            <Box height="3px" bg="gray.500" my={3} boxShadow={'lg'} />
                        </GridItem>}
                    {skills.length > 0 && <GridItem colSpan={1}>
                        <Heading size="lg" mb={3}>SKILLS</Heading>
                        {skills.map((s: string, i: number) => <Box display={'flex'} gap={2} verticalAlign={'middle'} key={s + i}>
                            <ColorSwatch value="#bada55" />
                            <Text>{s}</Text>
                        </Box>)}
                        <Box height="3px" bg="gray.500" my={3} boxShadow={'lg'} />
                    </GridItem>}
                    <GridItem colSpan={1}>
                        {expFlag && <Heading size="lg" mb={3}>WORK EXPERIENCE</Heading>}
                        {experience.map((exp, i) => {
                            if (Object.values(exp).every((v) => v !== "" && v !== undefined)) {
                                return (<Box key={i} mb={3}>
                                    <Heading size="sm" mb={3} fontWeight={'bolder'}>{`${exp.companyName} | ${exp.currentRole} | ${exp.fromdate?.[0]?.month}/${exp.fromdate?.[0]?.year} - ${exp.toDate?.[0]?.month}/${exp.toDate?.[0]?.year}`}</Heading>
                                    <Text mb={2}>{exp.roleAndResponsibility}</Text>
                                    <Box display={'flex'} mb={2}>
                                        <Heading size={'sm'} fontWeight={'bolder'}>Technologies used - </Heading>
                                        <Text>{exp.techUsed}</Text>
                                    </Box>
                                </Box>)
                            }
                        })}
                        {expFlag && <Box height="3px" bg="gray.500" my={3} boxShadow={'lg'} />}
                    </GridItem>
                    <GridItem colSpan={1}>
                        {educations.length > 0 && <Heading size="lg" mb={3}>EDUCATION</Heading>}
                        {educations.map((e) => (
                                <Box display={'flex'} mb={2} gap={2}>
                                    <Text fontWeight={'bold'}>{e.education + " - "}</Text>
                                    <Box>
                                        <Box display={'flex'} flexDirection={'column'}>
                                            <Text>{" " + e.university + " , "}</Text>
                                            <Box display={'flex'}>
                                                <Text>{e.from + " - "}</Text>
                                                <Text>{" " + e.to + " , "}</Text>
                                                <Text>{"CGPA / %age - " + e.cgpa}</Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                        ))
                        }
                        {educations.length > 0 && <Box height="3px" bg="gray.500" my={3} boxShadow={'lg'} />}
                    </GridItem>
                    {languages.length > 0 && <GridItem colSpan={1} mb={3}>
                        {languages.length > 0 && <Heading size="lg" mb={3}>LANGUAGES</Heading>}
                        {languages.length > 0 && <Box as={'ul'} display={'flex'} gap={2} flexDirection={'row'}>
                            {languages.map((e) => (
                                <Box as={'li'}>{e}</Box>
                            ))}
                        </Box>}
                    </GridItem>}
                </Grid>
            </Box>
        </Box>
    )
}
export default ResumePreview;