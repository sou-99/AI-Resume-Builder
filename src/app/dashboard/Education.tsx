import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { handleEducationLists, resetForm, setEducation, setLanguages } from "@/src/store/slices/educationSlice";
import { Box, Button, Field, Grid, GridItem, HStack, Input, Select, Tag, Text, VStack, createListCollection } from "@chakra-ui/react";
import { useState } from "react";

const roles = [
    { label: "Select Education Type", value: "Select Education Type" },
    { label: "Bachlor of Engineering", value: "B.Tech/B.E" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "metriculation", value: "Matriculation" },
    { label: "Bachlor of Science", value: "+3" },
]
const collection = createListCollection({
    items: roles,
});

const Education = () => {
    const { education, university, from, to, cgpa, error, educations,languages } = useAppSelector((state) => state.educationSlice)
    const dispatch = useAppDispatch()
    const [language,setLanguage] = useState<string>("")
    const handleEducation = (): void => {
        dispatch(handleEducationLists([...educations, { education, university, from, to, cgpa }]))
        dispatch(resetForm())
    }
    const removeEducation = (index: number) => {
        let arr = educations.filter((f, i) => i !== index);
        dispatch(handleEducationLists(arr))
    }
    const handleLanguage = (index:number) => {
        let arr = languages.filter((l,i)=>i!==index)
        dispatch(setLanguages(arr))
    }
    return (
        <Box mt={10}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Text marginBottom={2}>Select Education:</Text>
                    <Select.Root
                        collection={collection} // 🔥 mandatory
                        value={[education]}
                        onValueChange={(e) => dispatch(setEducation({ key: "education", value: e.value.toString() }))}
                        width="250px"
                    >
                        {/* Button */}
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select Experience" />
                        </Select.Trigger>

                        {/* Dropdown */}
                        <Select.Content>
                            {collection.items.map((item) => (
                                <Select.Item key={item.value} item={item}>
                                    {item.label}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Field.Root invalid={error.university}>
                        <Field.Label>College / School Name</Field.Label>
                        <Input
                            type="text"
                            value={university}
                            placeholder="e.g. IIT Bangalore"
                            onChange={(e) => dispatch(setEducation({ key: "university", value: e.target.value }))}
                        />
                        {error.university && (
                            <Field.ErrorText>This field is required</Field.ErrorText>
                        )}
                    </Field.Root>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Field.Root invalid={error.from}>
                        <Field.Label>From</Field.Label>
                        <Input
                            type="text"
                            value={from}
                            placeholder="e.g. YYYY"
                            onChange={(e) => dispatch(setEducation({ key: "from", value: e.target.value }))}
                        />
                        {error.from && (
                            <Field.ErrorText>This field is required</Field.ErrorText>
                        )}
                    </Field.Root>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Field.Root invalid={error.to}>
                        <Field.Label>To</Field.Label>
                        <Input
                            type="text"
                            value={to}
                            placeholder="e.g. YYYY"
                            onChange={(e) => dispatch(setEducation({ key: "to", value: e.target.value }))}
                        />
                        {error.to && (
                            <Field.ErrorText>This field is required</Field.ErrorText>
                        )}
                    </Field.Root>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Field.Root invalid={error.cgpa}>
                        <Field.Label>Percentage / CGPA</Field.Label>
                        <Input
                            type="text"
                            value={cgpa}
                            placeholder="e.g. YYYY"
                            onChange={(e) => dispatch(setEducation({ key: "cgpa", value: e.target.value }))}
                        />
                        {error.cgpa && (
                            <Field.ErrorText>This field is required</Field.ErrorText>
                        )}
                    </Field.Root>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Button disabled={education && university && from && to && cgpa ? false : true} onClick={() => handleEducation()}>Add</Button>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    {educations.length > 0 && <VStack>
                        <HStack wrap="wrap" border={'1px solid'} borderRadius={"l2"} mt={3} p={3}>
                            {educations.map((s, index) => (
                                <Tag.Root key={index} colorPalette="blue">
                                    <Tag.Label>{s.education + " - " + s.university + " | " + s.from + "-" + s.to + " | " + s.cgpa}</Tag.Label>
                                    <Tag.EndElement>
                                        <Tag.CloseTrigger onClick={() => removeEducation(index)} />
                                    </Tag.EndElement>
                                </Tag.Root>
                            ))}
                        </HStack>
                    </VStack>}
                </GridItem>
                <GridItem>
                    <VStack align="start">
                        <Box display={'flex'} flexDir={'column'} gap={2}>
                            <Text>Please enter languages known</Text>
                            <Box display={'flex'} gap={'3'}>
                            <Input
                                placeholder="Enter a languages (e.g. English,Hindi,Odia etc....)"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                                <Button onClick={() => { dispatch(setLanguages([...languages, language])); setLanguage("") }} disabled={language?false:true}>Add</Button>
                            </Box>
                        </Box>

                        {/* languages List */}
                        {languages.length > 0 && <HStack wrap="wrap" border={'1px solid'} borderRadius={"l2"} mt={3} p={3}>
                            {languages.map((s, index) => (
                                <Tag.Root key={index} colorPalette="blue">
                                    <Tag.Label>{s}</Tag.Label>
                                    <Tag.EndElement>
                                        <Tag.CloseTrigger onClick={() => handleLanguage(index)} />
                                    </Tag.EndElement>
                                </Tag.Root>
                            ))}
                        </HStack>}
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    )
}
export default Education;