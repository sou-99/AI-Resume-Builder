import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { addSkills } from "@/src/store/slices/skillSlice";
import { Box, CloseButton, ColorSwatch, Grid, GridItem, HStack, Image, Input, Link, Portal, Tag, Text, VStack } from "@chakra-ui/react"
import { Dialog, Button } from "@chakra-ui/react";
import { useState } from "react";

const Skill = () => {

    return (
        <Box mt={6}>
            <SampleSkills />
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mt={3}>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <SkillsInput/>
                </GridItem>
            </Grid>
        </Box>
    )
}
export default Skill;
const SampleSkills = () => {
    return (
        <Dialog.Root size={{ mdDown: "full", md: "lg" }}>
            <Dialog.Trigger asChild>
            <Text>Please enter your skills below and click Add. <Link variant="underline" colorPalette={'orange'}>Want to view sample?</Link></Text>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title></Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Image src={'/images/skillSample.jpg'} alt="Example" maxW="100%" height="auto"/>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>

    )
}
function SkillsInput() {
    const { skills } = useAppSelector((state) => state.skillSlice)
    const dispatch = useAppDispatch()
    const [skill,setSkill] = useState<string>("")
    const removeSkill = (index:number) =>{
        let restOfTheSkills = skills.filter((e,i) => i!==index)
        dispatch(addSkills(restOfTheSkills))
    }
    return (
        <VStack align="start">
            {/* Input + Button */}
            <HStack>
                <Input
                    placeholder="Enter a skill (e.g. React,Angular,nextJs,R)"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />
                <Button onClick={() => {dispatch(addSkills([...skills,skill]));setSkill("")}} disabled={skill?false:true}>Add</Button>
            </HStack>

            {/* Skills List */}
            {skills.length > 0 && <HStack wrap="wrap" border={'1px solid'} borderRadius={"l2"} mt={3} p={3}>
                {skills.map((s, index) => (
                    <Tag.Root key={index} colorPalette="blue">
                        <Tag.Label>{s}</Tag.Label>
                        <Tag.EndElement>
                            <Tag.CloseTrigger onClick={() => removeSkill(index)} />
                        </Tag.EndElement>
                    </Tag.Root>
                ))}
            </HStack>}
        </VStack>
    );
}