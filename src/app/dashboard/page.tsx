"use client"

import { Alert, Box, Button, ButtonGroup, Steps } from "@chakra-ui/react"
import { ReactNode, useEffect, useState } from "react"
import { useBreakpointValue } from "@chakra-ui/react";
import { Code, Menu, Portal, Stack } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons";
import PersonalInfo from "./PersonalInfo";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setActiveStep } from "@/src/store/slices/globalSlice";
import ResumePreview from "./ResumePreview";
import Summary from "./Summary";
import Skill from "./Skills";
import Experience from "./Experience";
import Education from "./Education";
type currentStepType = "Profile" | "profile summary" | "skills" | "work experience" | "education"
const steps = [
    {
        title: "Profile",
        description: <div><p>uuuuu</p><input /><input /><p></p></div>,
    },
    {
        title: "summary",
        description: "Step 3 description",
    },
    {
        title: "skills",
        description: "Step 3 description",
    },
    {
        title: "experience",
        description: "Step 2 description",
    },
    {
        title: "education",
        description: "Step 3 description",
    }
]
type ResumeStepType = {
    [key: string]: ReactNode;
}
const resumeSteps: ResumeStepType = {
    "Profile": <PersonalInfo />,
    "summary": <Summary />,
    "skills": <Skill />,
    "experience": <Experience />,
    "education": <Education />
}
const ResumeStepsDesktop = () => {
    const [step, setStep] = useState(1)
    const { activeStep, completedSteps } = useAppSelector((state) => state.globalInfo)
    const { name, email, phone, role, error } = useAppSelector((state) => state.personalInfo)
    const { experience, techSkills, summary } = useAppSelector((state) => state.summarySlice)
    const { skills } = useAppSelector((state) => state.skillSlice)
    const experienceSlice = useAppSelector((state) => state.experienceSlice)
    const { educations } = useAppSelector((state) => state.educationSlice)

    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useAppDispatch();
    const handleChange = (): boolean => {
        if (activeStep === "Profile") {
            if (name && email && phone && role && Object.values(error).every((v) => v === false)) {
                return true;
            } else {
                return false
            }
        }
        if (activeStep === "summary") {
            if (experience && techSkills && techSkills?.length > 0 && summary) {
                return true;
            } else {
                return false;
            }
        }
        if (activeStep === 'skills') {
            if (skills.length > 0) {
                return true;
            } else {
                return false;
            }
        }
        if (activeStep === 'experience') {
            let expFlag = experienceSlice.experience.some((exp) => Object.values(exp).every((v) => v !== "" && v !== undefined))
            let errFlag = experienceSlice.error.every((exp) => Object.values(exp).every((v) => v === false))
            if (expFlag && errFlag) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    useEffect(() => {
        let index = steps.findIndex((s) => s.title === activeStep)
        if (index + 1 !== step) {
            setStep(index + 1)
        }
    }, [activeStep])
    return (
        <Box bg="#558f64" w="100%" minH="100dvh">
            <Box display={"flex"} flexDirection={'row'}>
                <Steps.Root
                    step={step}
                    onStepChange={(e) => {
                        if (handleChange() || e.step < step) {
                            setStep(e.step)
                            console.log("man=", e.step, steps.find((s, i) => i + 1 === e.step))
                            let title = steps.find((s, i) => i + 1 === e.step)?.title || "Profile";
                            dispatch(setActiveStep(title))
                            setShowAlert(false)
                        } else {
                            setShowAlert(true)
                        }
                    }
                    }
                    count={steps.length}
                    orientation={"horizontal"} // 👈 key change
                    w={"1/2"} minH="100dvh" borderRadius={'sm'}
                    m={5} p={2}
                    bg={'white'}
                >
                    <Steps.List>
                        {steps.map((step, index) => (
                            <Steps.Item key={index} index={index} title={step.title} h={'auto'}>
                                <Steps.Indicator boxSize={{ base: "6", md: "8" }} />
                                <Steps.Title>{step.title}</Steps.Title>
                                <Steps.Separator />
                            </Steps.Item>
                        ))}
                    </Steps.List>

                    <Steps.Content index={step}>
                        {resumeSteps[activeStep] ? resumeSteps[activeStep] : <></>}
                    </Steps.Content>
                    {showAlert &&
                        <Alert.Root status="error">
                            <Alert.Indicator />
                            <Alert.Title>There was an error processing your request</Alert.Title>
                        </Alert.Root>}
                    {educations.length > 0 ? <Steps.CompletedContent>
                        <Alert.Root status="success">
                            <Alert.Indicator />
                            <Alert.Title>All Done!</Alert.Title>
                        </Alert.Root></Steps.CompletedContent> : <></>}
                    <ButtonGroup size="sm" variant="outline">
                        <Steps.PrevTrigger asChild>
                            <Button>Prev</Button>
                        </Steps.PrevTrigger>
                        <Steps.NextTrigger asChild>
                            <Button>Next</Button>
                        </Steps.NextTrigger>
                    </ButtonGroup>
                </Steps.Root>
                <ResumePreview />
            </Box>
        </Box>
    )
}
const ResumeStepsMobile = () => {
    const [open, setOpen] = useState(false);
    const { activeStep, completedSteps } = useAppSelector((state) => state.globalInfo)
    const { name, email, phone, role, error } = useAppSelector((state) => state.personalInfo)
    const { experience, techSkills, summary } = useAppSelector((state) => state.summarySlice)
    const { skills } = useAppSelector((state) => state.skillSlice)
    const experienceSlice = useAppSelector((state) => state.experienceSlice)
    const { educations,languages } = useAppSelector((state) => state.educationSlice)
    const [showResume,setShowResume] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useAppDispatch();
    const handleChange = (): void => {
        let index = steps.findIndex((s)=>s.title === activeStep)
        if (activeStep === "Profile") {
            if (name && email && phone && role && Object.values(error).every((v) => v === false)) {
                dispatch(setActiveStep(steps[index+1]?.title))
                setShowAlert(false)
            } else {
                setShowAlert(true)
            }
        }
        if (activeStep === "summary") {
            if (experience && techSkills && techSkills?.length > 0 && summary) {
                dispatch(setActiveStep(steps[index+1]?.title))
                setShowAlert(false)
            } else {
                setShowAlert(true)
            }
        }
        if (activeStep === 'skills') {
            if (skills.length > 0) {
                dispatch(setActiveStep(steps[index+1]?.title))
                setShowAlert(false)
            } else {
                setShowAlert(true)
            }
        }
        if (activeStep === 'experience') {
            let expFlag = experienceSlice.experience.some((exp) => Object.values(exp).every((v) => v !== "" && v !== undefined))
            let errFlag = experienceSlice.error.every((exp) => Object.values(exp).every((v) => v === false))
            if (expFlag && errFlag) {
                dispatch(setActiveStep(steps[index+1]?.title))
                setShowAlert(false)
            } else {
                setShowAlert(true)
            }
        }
    }
    return (
        <Box m={5}>
            <Button onClick={()=>setShowResume(!showResume)} mt={2} mb={2}>{!showResume?"Preview Resume":"Go Back"}</Button>
            {!showResume?<>
            <Stack gap="4" align="flex-start">
                <Code>Current Section: {activeStep}</Code>
                <Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                    <Menu.Trigger asChild>
                        <Button variant="outline" size="sm" width={'full'}>
                            {activeStep}
                        </Button>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner w="full" p={3}>
                            <Menu.Content w="full">
                                {steps.map((t) => (
                                    <Menu.Item
                                        value={t.title}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        key={t.title}
                                        onClick={() => dispatch(setActiveStep(t.title))}
                                    >
                                        {t.title} {activeStep === t.title ? <EditIcon size="sm" /> : ""}
                                    </Menu.Item>))}
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            </Stack>
            {showAlert &&
                        <Alert.Root status="error" mt={3}>
                            <Alert.Indicator />
                            <Alert.Title>There was an error processing your request</Alert.Title>
                        </Alert.Root>}
            {resumeSteps[activeStep] ? resumeSteps[activeStep] : <></>}
            {educations.length > 0 ? 
                        <Alert.Root status="success" mt={3}>
                            <Alert.Indicator />
                            <Alert.Title>All Done!</Alert.Title>
                        </Alert.Root> : <></>}
            </>:<ResumePreview/>}
            <Box mt={3}>
                <Button onClick={()=>handleChange()}>Save</Button>
            </Box>
        </Box>
    )
}

const ResumeSteps = () => {

    const isMobile = useBreakpointValue({ base: true, lg: false });
    console.log("isMobile=", isMobile);
    if (isMobile) {
        return <ResumeStepsMobile />
    } else {
        return <ResumeStepsDesktop />
    }
}
export default ResumeSteps;

