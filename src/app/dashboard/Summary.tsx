// app/resume/page.tsx (or any component)
"use client";

import { useState } from "react";
import { Box, Button, Em, Field, Grid, GridItem, HStack, Input, Tag, TagLabel, Text, Textarea, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { Select, createListCollection } from "@chakra-ui/react";
import { removeTechSkills, setExperience, setSummary, setTechSkills } from "@/src/store/slices/summarySlice";

type skillTypes = {
    skill: string;
    skills: string[];
    setSkill: React.Dispatch<React.SetStateAction<string>>;
    setSkills: React.Dispatch<React.SetStateAction<string[]>>;
    techSkills: string[];
    analyticalSkills: string[];
}
const roles = [
    { label: "Fresher", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
    { label: "26", value: "26" },
    { label: "27", value: "27" },
    { label: "28", value: "28" },
    { label: "29", value: "29" },
    { label: "30", value: "30" }
];
// ✅ REQUIRED in v3
const collection = createListCollection({
    items: roles,
});

export default function Summary() {
    const { experience, techSkills, analyticalSkills, summary } = useAppSelector((state) => state.summarySlice)
    const { role } = useAppSelector((state) => state.personalInfo)
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const dispatch = useAppDispatch()
    async function generateSummary() {
        setLoading(true);

        const res = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt:
                    `Professional summary for:
        Role: ${role}
        Experience: ${experience} years
        Skills: ${techSkills.join(", ")}`
            }),
        });

        const data = await res.json();
        dispatch(setSummary(data.result)); // ✅ update UI
        setLoading(false);
    }

    return (
        <Box mt={6}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Text marginBottom={2}>Please select your brief infomations to generate the profile summary.</Text>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Text marginBottom={2}>Select Experience:</Text>
                    <Select.Root
                        collection={collection} // 🔥 mandatory
                        value={[experience]}
                        onValueChange={(e) => dispatch(setExperience(e.value.toString()))}
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
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Text marginBottom={2}>Add skills:<Em>(max 5)</Em></Text>
                    <SkillsInput skill={skill} skills={skills} setSkill={setSkill} setSkills={setSkills} techSkills={techSkills} analyticalSkills={analyticalSkills} />
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Button onClick={generateSummary} disabled={!experience || techSkills.length===0}>
                        ✨ Generate Summary
                    </Button>
                </GridItem>
                {summary && <GridItem colSpan={{ base: 2, md: 2 }}>
                    <Text mb={2}><Em>If you need, can do manual edits on the summary.</Em></Text>
                    <Textarea
                        placeholder="Your summary will appear here..."
                        value={summary}
                        onChange={(e) => dispatch(setSummary(e.target.value))}
                        minHeight={"10rem"}
                    />
                </GridItem>}
            </Grid>
        </Box>
    );
}

function SkillsInput({ skill, skills, setSkill, setSkills, techSkills, analyticalSkills }: skillTypes) {
    const dispatch = useAppDispatch()
    const addSkill = (key: "techSkills" | "analyticalSkills") => {
        if (!skill.trim()) return;

        dispatch(setTechSkills({ key: key, value: [...techSkills, skill.trim()] }));
        setSkill("");
    };

    const removeSkill = (index: number) => {
        dispatch(removeTechSkills({ key: "techSkills", value: techSkills.filter((_, i) => i !== index) }));
    };

    return (
        <VStack align="start">
            {/* Input + Button */}
            <HStack>
                <Input
                    placeholder="Enter a skill (e.g. React)"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addSkill("techSkills");
                        }
                    }}
                />
                <Button onClick={() => addSkill("techSkills")} disabled={techSkills?.length === 5}>Add</Button>
            </HStack>

            {/* Skills List */}
            <HStack wrap="wrap">
                {techSkills.map((s, index) => (
                    <Tag.Root key={index} colorPalette="blue">
                        <Tag.Label>{s}</Tag.Label>
                        <Tag.EndElement>
                            <Tag.CloseTrigger onClick={() => removeSkill(index)} />
                        </Tag.EndElement>
                    </Tag.Root>
                ))}
            </HStack>
        </VStack>
    );
}